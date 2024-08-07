import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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

  constructor(private router: Router, private route: ActivatedRoute, private countyService: CountyService, private fb: FormBuilder, private policeDepartmentService: PoliceDepartmentService) { }

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
  }


  //Initialize Add Police Department Form
  initializationAddPoliceDepartmentForm() {
    this.addPoliceDepartmentForm = this.fb.group({
      name: ['', Validators.required],
      countyId: ['', Validators.required],
      code: ['', Validators.required],
      loginLink: ['', Validators.required],
      searchLink: ['', Validators.required],
      image: ""
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

  //Toggle edit image
  toggleEditImage() {
    this.isImageEdit = !this.isImageEdit
  }

  // image convertor to show preview of selected image
  imageConverter(e) {
    const file: File = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const base64String: string = reader.result as string;
        this.supportingImage = base64String;
      };
      reader.readAsDataURL(file);
    }
    if (file) {
      this.imageFile = file
    }
    else {
      console.log('Please select a image file')
    }
    console.log(typeof (this.imageFile))
  }

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
            console.log('Police Department updated !')
            this.back()
          }
          else {
            console.log('Error in Updating Police Department !')
          }
        })
      }
      else {
        this.policeDepartmentService.savePoliceDepartment(formData).subscribe(res => {
          if (res?.status) {
            const dep_id = res.police_department_id;
            const imageFile = this.addPoliceDepartmentForm.value.image;
            if (dep_id && imageFile) {
              this.policeDepartmentService.savePoliceDepartmentImage(imageFile, dep_id)
            }

            this.back()
          }
          else {
            console.log('Error in adding Police Department!')
          }
        })
      }
    }
  }

  back() {
    this.router.navigate(['superAdmin/policeDepartment/'])
  }

}
