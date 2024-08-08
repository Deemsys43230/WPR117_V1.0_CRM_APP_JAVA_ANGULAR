import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators,AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FlashMessageService } from 'src/app/shared/flash-message/flash-message.service';
import { CountyService } from 'src/app/shared/services/county.service';
import { PoliceDepartmentService } from 'src/app/shared/services/police-department-service';

@Component({
  selector: 'app-add-department',
  templateUrl: './add-department.component.html',
  styleUrls: ['./add-department.component.scss']
})
export class AddDepartmentComponent implements OnInit {
  public id: any;
  public isEdit: boolean = false;
  public countyList: any[] = [];
  public addPoliceDepartmentForm: FormGroup;
  public isAddFormSubmitted: any = false;
  public supportingImage: any;
  public imageFile: any;
  public isImage: boolean = false;
  public isImageEdit: boolean = true;
  public selectedFile: File | null = null;
  public invalidImageType:boolean = false;

  constructor(private router: Router, private route: ActivatedRoute, private countyService: CountyService, private fb: FormBuilder, private policeDepartmentService: PoliceDepartmentService, private flashMessageService: FlashMessageService) { }

  ngOnInit(): void {
    //Get Police Department id for Edit
    this.route.params.subscribe((param) => {
      this.id = param['id']
    })
    if (this.id) {
      this.isEdit = true;
      this.getPoliceDepartmentById()
    }
    this.getAllCounty()
    this.initializationAddPoliceDepartmentForm()
    this.addPoliceDepartmentForm.get('name')?.valueChanges.subscribe(value => {
      this.onChangeName(value);
    });
  }


  //Initialize Add Police Department Form
  initializationAddPoliceDepartmentForm() {
    this.addPoliceDepartmentForm = this.fb.group({
      name: ['', [Validators.required,Validators.pattern("[a-zA-Z ]*")]],
      countyId: ['', Validators.required],
      code: ['', [Validators.required,this.codePatternValidator()]],
      loginLink: ['', Validators.required],
      searchLink: ['', Validators.required],
      image: [""]
    })
  }

  //get the role of the admin
  getAllCounty() {
    var data = {}
    this.countyService.getAllCounty(data).subscribe(res => {
      if (res.status) {
        this.countyList = []
        let counties = res.data;
        counties.forEach((element) => {
          let data = {
            "county_id": element.county_id,
            "county_name": element.name
          }
          this.countyList.push(data)
        });
      }
    })
  }

  //Get Police Department details by id
  getPoliceDepartmentById() {
    this.policeDepartmentService.getByIdPoliceDepartmentDetails(this.id).subscribe(res => {
      if (res.status) {
        const data = {
          name: res.data.name,
          countyId: res.data.county_id,
          code: res.data.code,
          loginLink: res.data.login_link,
          searchLink: res.data.search_link,
        }
        if (res.data.url) {
          this.supportingImage = res.data.url
          this.isImage = true;
        }
        this.addPoliceDepartmentForm.patchValue(data)
      }
    })
  }

  //Custom Validator for Code Input Field
  codePatternValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      const valid = /^RR_.*_$/.test(value);
      return valid ? null : { invalidCodePattern: true };
    };
  }

  onChangeName(value){
    if (value) {
      const lowercaseValue = value?.toLowerCase();
      const searchLinkValue = `${lowercaseValue}_search`;
  
      this.addPoliceDepartmentForm.patchValue({
        loginLink: lowercaseValue,
        searchLink: searchLinkValue
      });
    }
  }

  //Toggle edit image
  toggleEditImage() {
    this.isImageEdit = !this.isImageEdit
  }

  // To   Change Image In Product Form  Function 
  onChangeNewImage(event: any): void {
    const file = event.target.files[0];
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/jfif"];
    const fileType = file.type;
    if (!allowedTypes.includes(fileType)) {
      this.addPoliceDepartmentForm.get('image')?.setErrors({ 'invalidType': true });
      return;
    }
    const reader = new FileReader();
    reader.onload = (e: any) => {
      const img = new Image();
      img.onload = () => {
        if (img.width !== 1400 || img.height !== 450) {
          this.addPoliceDepartmentForm.get('image')?.setErrors({ 'invalidDimensions': true });
          return;
        }
        this.addPoliceDepartmentForm.get('image')?.setErrors(null);
        this.addPoliceDepartmentForm.get('image')?.updateValueAndValidity();
        this.selectedFile = file;
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  }

  //Submit form data
  onSubmit() {
    const data = this.addPoliceDepartmentForm.value;
    const formData = {
      'county_id': data.countyId,
      'name': data.name,
      'code': data.code,
      'login_link': data.loginLink,
      'search_link': data.searchLink,
    };

    this.isAddFormSubmitted = true;
    if (this.addPoliceDepartmentForm.valid) {
      if (this.isEdit) {
        this.policeDepartmentService.updatePoliceDepartment(formData, this.id).subscribe(res => {
          if (res.status) {
            if (this.id && this.selectedFile) {
              const imageData = new FormData()
              imageData.append('dep_id' , this.id)
              imageData.append('file',this.selectedFile)
              this.policeDepartmentService.savePoliceDepartmentImage(imageData).subscribe(res=>console.log(res.msg))
            }
            this.flashMessageService.successMessage(res.msg, 2)
            this.back()
          }
          else {
            this.flashMessageService.errorMessage(res.msg, 2)
          }
        })
      }
      else {
        this.policeDepartmentService.savePoliceDepartment(formData).subscribe(res => {
          if (res?.status) {
              const dep_id = res.police_department_id
              if (dep_id && this.selectedFile) {
                const imageData = new FormData()
                imageData.append('dep_id' , dep_id)
                imageData.append('file',this.selectedFile)
                this.policeDepartmentService.savePoliceDepartmentImage(imageData).subscribe(res=>console.log(res.msg))
              }
            this.flashMessageService.successMessage(res.msg, 2)
            this.back()
          }
          else {
            this.flashMessageService.errorMessage(res.msg, 2)
          }
        })
      }
    }
  }

  back() {
    this.router.navigate(['superAdmin/policeDepartment/'])
  }

}
