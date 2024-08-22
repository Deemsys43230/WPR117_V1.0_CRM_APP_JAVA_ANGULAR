import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {
  searchForm: FormGroup;
  isSubmitted = false; 
  
  constructor(private fb: FormBuilder) {
    this.searchForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      crashDate: [''],
      reportNumber: ['', [Validators.pattern('^\\d+$')]],
      location: [''],
    });
  }

   onSubmit() {
    this.isSubmitted = true;
    if (this.searchForm.valid) {
      console.log(this.searchForm.value)
      this.searchForm.reset();
      this.isSubmitted = false;
    } 
  }
}
