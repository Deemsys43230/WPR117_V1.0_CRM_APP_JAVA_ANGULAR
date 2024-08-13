import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CrashSeverity, Injuries, SeatingPosition } from 'src/app/constants';
import { PoliceDepartmentService } from 'src/app/shared/services/police-department-service';
import { FlashMessageService } from 'src/app/shared/flash-message/flash-message.service';
import { CountyService } from 'src/app/shared/services/county.service';
import { CrashReportService } from 'src/app/shared/services/crash-report-service';
import { AccountsDepartmentService } from 'src/app/shared/services/accounts-department-service';
@Component({
  selector: 'app-add-new-report',
  templateUrl: './add-new-report.component.html',
  styleUrls: ['./add-new-report.component.scss']
})
export class AddNewReportComponent {
  addNewReportForm: FormGroup;
  countries: any[] = [];
  police_name: any;
  policeImageUrl: string = '';
  public isAddFormSubmitted: any = false;
  public selectedFile: File | null = null;
  public isEdit: boolean = false;
  public id: any;
  public account_id: any;
  public police_department_id: any;
  crashSeverityOptions = CrashSeverity;
  injuries = Injuries;
  seatingPosition = SeatingPosition;

  constructor(private fb: FormBuilder, private countryService: CountyService, private flashMessageService: FlashMessageService, private policeDepartmentService: PoliceDepartmentService, private router: Router, private activatedRoute: ActivatedRoute, private crashReportService: CrashReportService, private accountsdepartment: AccountsDepartmentService) { }

  // ngOnInit
  ngOnInit(): void {
    this.initializationNewReportForm();
    this.getAllCountry();
    this.activatedRoute.paramMap.subscribe(params => {
      this.police_name = params.get('departmentName');
      if (this.police_name) {
        this.getByNamePoliceDepartment();
      }
    })
    this.getByIdAccounts();
  }

  // Initialization new report form
  initializationNewReportForm() {
    this.addNewReportForm = this.fb.group({
      uploadReport: [''],
      country: [''],
      crashDate: [''],
      reportNumber: [''],
      location: [''],
      crashSeverity: [''],
      occupants: this.fb.array([this.createOccupant()])
    })
  }

  // Get all country name
  getAllCountry() {
    this.countryService.getAllCounty({ page: 1, itemPerPage: "" }).subscribe((res) => {
      if (res.status) {
        this.countries = res.data.map(country => ({
          value: country.county_id,
          label: country.name
        }));
      }
    })
  }

  // Navigate back to reports list
  backToReportList() {
    this.router.navigate(['reports/', this.police_name])
  }

  get occupants(): FormArray {
    return this.addNewReportForm.get('occupants') as FormArray;
  }

  // New occupant creation
  createOccupant(): FormGroup {
    return this.fb.group({
      first_name: [''],
      last_name: [''],
      injuries: [''],
      seating_position: ['']
    });
  }

  // Adding one more occupant
  addOneMoreOccupant(): void {
    this.occupants.push(this.createOccupant());
  }

  // Remove added occupant
  removeOccupant(index: number): void {
    if (this.occupants.length > 1) {
      this.occupants.removeAt(index);
    }
  }

  // Get image
  getByNamePoliceDepartment() {
    this.policeDepartmentService.getByNamePoliceDepartmentDetails(this.police_name).subscribe(res => {
      if (res.status) {
        this.policeImageUrl = res.data.url;
      }
    })
  }

  // Get by id
  getByIdAccounts() {
    const acc_id = localStorage.getItem('account_id');
    this.accountsdepartment.getByIdAccountsDetails(acc_id).subscribe(res => {
      if (res.status) {
        this.account_id = res.data.account_id;
        this.police_department_id = res.data.police_department_id;
      }
    })
  }

  // Report file change
  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file && file.type !== 'application/pdf') {
      alert('Please upload a PDF file.');
      this.addNewReportForm.get('uploadReport')?.reset();
    }
    else {
      this.selectedFile = file;
    }
  }

  // On submit
  onSubmit() {
    const data = this.addNewReportForm.value;
    const formData = new FormData();
    formData.append('account_id', this.account_id)
    formData.append('police_department_id', this.police_department_id)
    formData.append('report_number', data.reportNumber)
    formData.append('crash_date', data.crashDate)
    formData.append('location', data.location)
    formData.append('county_id', data.country)
    formData.append('crash_severity', data.crashSeverity)
    formData.append('no_of_occupants', data.occupants.length)
    this.occupants.controls.forEach((control, index) => {
      const group = control as FormGroup;
      const formValues = group.value;
      Object.keys(formValues).forEach(key => {
        formData.append(`occupantsForms[${index}][${key}]`, formValues[key]);
      });
      formData.append(`occupantsForms[${index}][status]`, '1');
      formData.append(`occupantsForms[${index}][sequence_no]`, '1');
    });
    formData.append('crashReportFile', this.selectedFile ? this.selectedFile : null)

    this.isAddFormSubmitted = true;
    if (this.addNewReportForm.valid) {
      if (this.isEdit) {
        this.crashReportService.updateCrashReport(formData, this.id).subscribe(res => {
          if (res.status) {
            this.flashMessageService.successMessage(res.msg, 2)
            this.onCancel()
          }
          else {
            this.flashMessageService.errorMessage(res.msg, 2)
          }
        })
      }
      else {
        this.crashReportService.saveCrashReport(formData).subscribe(res => {
          if (res?.status) {
            this.flashMessageService.successMessage(res.msg, 2)
            this.onCancel()
          }
          else {
            this.flashMessageService.errorMessage(res.msg, 2)
          }
        })
      }
    }
  }

  // On Cancel
  onCancel() {
    this.router.navigate(['reports/', this.police_name])
  }
}
