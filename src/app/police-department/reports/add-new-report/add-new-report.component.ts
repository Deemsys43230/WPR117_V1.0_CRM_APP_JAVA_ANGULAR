import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CrashSeverity, Injuries, SeatingPosition } from 'src/app/constants';
import { PoliceDepartmentDataService } from 'src/app/shared/api/police-department-data.service';
import { CountyService } from 'src/app/shared/services/county.service';

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
  crashSeverityOptions = CrashSeverity;
  injuries = Injuries;
  seatingPosition = SeatingPosition;

  constructor(private fb: FormBuilder, private countryService: CountyService, private policeDepartmentService: PoliceDepartmentDataService, private router: Router, private activatedRoute: ActivatedRoute) { }

  // ngOnInit
  ngOnInit(): void {
    this.initializationNewReportForm();
    this.getAllCountry();
    this.activatedRoute.paramMap.subscribe(params => {
      this.police_name = params.get('departmentName');
      if(this.police_name) {
        this.getByNamePoliceDepartment();
      }
    })
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
      firstName: [''],
      lastName: [''],
      injuries: [''],
      seatingPosition: ['']
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
}
