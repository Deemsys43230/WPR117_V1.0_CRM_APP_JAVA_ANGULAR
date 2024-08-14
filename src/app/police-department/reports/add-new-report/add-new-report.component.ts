import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CrashSeverity, Injuries, SeatingPosition } from 'src/app/constants';
import { PoliceDepartmentService } from 'src/app/shared/services/police-department-service';
import { FlashMessageService } from 'src/app/shared/flash-message/flash-message.service';
import { CountyService } from 'src/app/shared/services/county.service';
import { CrashReportService } from 'src/app/shared/services/crash-report-service';
import { AccountsDepartmentService } from 'src/app/shared/services/accounts-department-service';
import { OccupantsService } from 'src/app/shared/services/occupants-service';
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
  public id: any;
  public account_id: any;
  public police_department_id: any;
  crashSeverityOptions = CrashSeverity;
  injuries = Injuries;
  seatingPosition = SeatingPosition;
  public report_id: any;
  fileName: string = '';
  isNewForm: boolean = true; // Flag to determine if it's a new form or edit form
  showFileInputField: boolean = false; 

  constructor(private fb: FormBuilder, private countryService: CountyService, private flashMessageService: FlashMessageService, private policeDepartmentService: PoliceDepartmentService, private router: Router, private activatedRoute: ActivatedRoute, private crashReportService: CrashReportService, private accountsdepartment: AccountsDepartmentService, private occupantsService: OccupantsService) { }

  // ngOnInit
  ngOnInit(): void {
    this.initializationNewReportForm();
    this.getAllCountry();
    this.activatedRoute.paramMap.subscribe(params => {
      this.police_name = params.get('departmentName');
      if (this.police_name) {
        this.getByNamePoliceDepartment();
      }
    });
    this.getByIdAccounts();
    this.activatedRoute.params.subscribe(param => {
      this.report_id = param['id'];
      this.isNewForm = !this.report_id; // Determine if it's a new form or edit form
      if (!this.isNewForm) {
        this.getByIdCrashReport();
      }
    });
  }

  // Initialization new report form
  initializationNewReportForm() {
    this.addNewReportForm = this.fb.group({
      file_name: [''],
      county_id: [''],
      crash_date: [''],
      report_number: [''],
      location: [''],
      crash_severity: [''],
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

  // On submit
  onSubmit() {
    const data = this.addNewReportForm.value;
    const formData = new FormData();
    formData.append('account_id', this.account_id)
    formData.append('police_department_id', this.police_department_id)
    formData.append('report_number', data.report_number)
    formData.append('crash_date', data.crash_date)
    formData.append('location', data.location)
    formData.append('county_id', data.county_id)
    formData.append('crash_severity', data.crash_severity)
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
      if (this.report_id) {
        this.crashReportService.updateCrashReport(formData, this.report_id).subscribe(res => {
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
          if (res) {
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

  //get by id crash report
  getByIdCrashReport() {
    this.occupantsService.getByIdCrashReport(this.report_id).subscribe((res) => {
      this.fileName = this.extractFileName(res.data.file_name);
      const crashDate = this.convertToDateFormat(res.data.crash_date);
      this.addNewReportForm.patchValue({
        county_id: res.data.county_id,
        crash_date: crashDate,
        report_number: res.data.report_number,
        location: res.data.location,
        crash_severity: res.data.crash_severity
      });
      const occupantsArray = this.addNewReportForm.get('occupants') as FormArray;
      occupantsArray.clear();
      res.data.occupants.forEach((occupant: any) => {
        occupantsArray.push(this.fb.group({
          first_name: [occupant.first_name],
          last_name: [occupant.last_name],
          injuries: [occupant.injuries],
          seating_position: [occupant.seating_position]
        }));
      });
      this.showFileInputField = false;
    });
  }

  // Convert date format
  convertToDateFormat(dateString: string): string {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  // Report file change
  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      if (file.type !== 'application/pdf') {
        alert('Please upload a PDF file.');
        this.addNewReportForm.get('file_name')?.reset();
      } else {
        this.selectedFile = file;
        this.fileName = file.name;
      }
    }
  }

  showFileInput() {
    this.showFileInputField = true;
  }

  extractFileName(url: string): string {
    const parts = url.split('/');
    return parts[parts.length - 1];
  }

  // On Cancel
  onCancel() {
    this.router.navigate(['reports/', this.police_name])
  }
}
