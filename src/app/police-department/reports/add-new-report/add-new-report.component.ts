import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CrashSeverity, Injuries, SeatingPosition } from 'src/app/constants';
import { PoliceDepartmentService } from 'src/app/shared/services/police-department-service';
import { FlashMessageService } from 'src/app/shared/flash-message/flash-message.service';
import { CountyService } from 'src/app/shared/services/county.service';
import { CrashReportService } from 'src/app/shared/services/crash-report-service';
import { AccountsDepartmentService } from 'src/app/shared/services/accounts-department-service';
import { OccupantsService } from 'src/app/shared/services/occupants-service';
import { debounceTime, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-add-new-report',
  templateUrl: './add-new-report.component.html',
  styleUrls: ['./add-new-report.component.scss'],
  providers: [DatePipe],
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
  backendMessage: string | null = null;
  today: Date;

  constructor(private fb: FormBuilder, private countryService: CountyService, private flashMessageService: FlashMessageService, private policeDepartmentService: PoliceDepartmentService, private router: Router, private activatedRoute: ActivatedRoute, private crashReportService: CrashReportService, private accountsdepartment: AccountsDepartmentService, private occupantsService: OccupantsService, private datePipe: DatePipe) {
    this.addNewReportForm = this.fb.group({
      crash_date: [null],
    });
  }

  //ngOnInit
  ngOnInit(): void {
    this.today = new Date();
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

    //Report number field
    this.addNewReportForm.get('report_number')?.valueChanges
      .pipe(
        debounceTime(500),
        switchMap(value => {
          if (value) {
            const valueData = { "report_number": value, "report_id": this.report_id ? this.report_id : "" }
            return this.occupantsService.checkReportNumber(valueData)
          }
          else {
            return of(null);
          }
        })
      )
      .subscribe(response => {
        if (response?.isExist) {
          this.addNewReportForm.get('report_number')?.setErrors({ reportExists: true });
          this.backendMessage = response.message || "Report Number already exists.";
        } else {
          this.addNewReportForm.get('report_number')?.setErrors(null);
        }
      });
  }

  //Initialization new report form
  initializationNewReportForm() {
    this.addNewReportForm = this.fb.group({
      file_name: [this.isNewForm ? null : this.fileName, Validators.required],
      county_id: [''],
      crash_date: ['', Validators.required],
      report_number: ['', Validators.required],
      location: ['', Validators.required],
      crash_severity: ['', Validators.required],
      occupants: this.fb.array([this.createOccupant()])
    })
  }

  //Get all country name
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

  //Navigate back to reports list
  backToReportList() {
    this.router.navigate(['reports/', this.police_name])
  }

  get occupants(): FormArray {
    return this.addNewReportForm.get('occupants') as FormArray;
  }

  //New occupant creation
  createOccupant(): FormGroup {
    return this.fb.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      injuries: [''],
      seating_position: ['']
    });
  }

  //Adding one more occupant
  addOneMoreOccupant(): void {
    this.occupants.push(this.createOccupant());
  }

  //Remove added occupant
  removeOccupant(index: number): void {
    if (this.occupants.length > 1) {
      this.occupants.removeAt(index);
    }
  }

  //Get image
  getByNamePoliceDepartment() {
    this.policeDepartmentService.getByNamePoliceDepartmentDetails(this.police_name).subscribe(res => {
      if (res.status) {
        this.policeImageUrl = res.data.url;
      }
    })
  }

  //Get by id
  getByIdAccounts() {
    const acc_id = localStorage.getItem('account_id');
    this.accountsdepartment.getByIdAccountsDetails(acc_id).subscribe(res => {
      if (res.status) {
        this.account_id = res.data.account_id;
        this.police_department_id = res.data.police_department_id;
      }
    })
  }

  //On submit
  onSubmit() {
    const rawDate = this.addNewReportForm.value.crash_date;
    const formattedDate = this.datePipe.transform(rawDate, 'yyyy-MM-dd');
    this.isAddFormSubmitted = true;
    // Handle missing file_name for edit mode
    if (!this.addNewReportForm.get('file_name')?.value && !this.isNewForm && this.fileName) {
      this.addNewReportForm.get('file_name')?.setValue(this.fileName);
      this.addNewReportForm.get('file_name')?.updateValueAndValidity();
    }

    // Check form validity
    if (!this.addNewReportForm.valid) {
      return;
    }

    if (this.addNewReportForm.valid) {
      const data = this.addNewReportForm.value;
      const formData = new FormData();
      formData.append('account_id', this.account_id);
      formData.append('police_department_id', this.police_department_id);
      formData.append('report_number', data.report_number);
      formData.append('crash_date', formattedDate);
      formData.append('location', data.location);
      formData.append('county_id', data.county_id);
      formData.append('crash_severity', data.crash_severity);
      formData.append('no_of_occupants', data.occupants.length.toString());

      this.occupants.controls.forEach((control, index) => {
        const group = control as FormGroup;
        const formValues = group.value;
        Object.keys(formValues).forEach(key => {
          formData.append(`occupantsForms[${index}][${key}]`, formValues[key]);
        });
        formData.append(`occupantsForms[${index}][status]`, '1');
        formData.append(`occupantsForms[${index}][sequence_no]`, '1');
      });

      if (this.selectedFile) {
        formData.append('crashReportFile', this.selectedFile);
      } else if (this.fileName) {
        // Handle the case when editing without uploading a new file
        formData.append('crashReportFile', this.fileName);
      }

      if (this.report_id) {
        this.crashReportService.updateCrashReport(formData, this.report_id).subscribe(res => {
          if (res?.status) {
            this.flashMessageService.successMessage(res.msg, 2);
            this.router.navigate(['reports/', this.police_name]);
          } else {
            this.flashMessageService.errorMessage(res?.msg, 2);
          }
        });
      } else {
        this.crashReportService.saveCrashReport(formData).subscribe(res => {
          if (res.status) {
            this.flashMessageService.successMessage(res.msg, 2);
            this.router.navigate(['reports/', this.police_name]);
          } else {
            this.flashMessageService.errorMessage(res.msg, 2);
          }
        });
      }
    }
  }

  //get by id crash report
  getByIdCrashReport() {
    this.occupantsService.getByIdCrashReport(this.report_id).subscribe((res) => {
      this.fileName = res.data.file_name;
      const crashDate = res.data.crash_date;
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

  //Convert date format
  convertToDateFormat(dateString: string): string {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  //Report file change
  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      if (file.type !== 'application/pdf') {
        alert('Please upload a PDF file.');
        this.addNewReportForm.get('file_name')?.reset();
        this.selectedFile = null;
        this.fileName = null;
      } else {
        this.selectedFile = file; // Store the file
        this.fileName = file.name; // Store the file name
        this.addNewReportForm.patchValue({ file_name: file.name }); // Update the form control
        this.addNewReportForm.get('file_name')?.updateValueAndValidity();
      }
    }
  }

  showFileInput() {
    this.showFileInputField = true;
  }

  //On Cancel
  onCancel() {
    this.router.navigate(['reports/', this.police_name])
  }

  openDatePicker(obj) {
    if (obj) {
      obj.show();
    }
  }

  // Extracts the file name from the URL
  getFileName(fileUrl: string): string {
    return fileUrl.split('/').pop() || fileUrl;
  }

  // Resets to the original state when cancel is clicked
  cancelChange(): void {
    this.showFileInputField = false;
  }
}
