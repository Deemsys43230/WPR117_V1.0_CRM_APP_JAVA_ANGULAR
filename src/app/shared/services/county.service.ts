import { Injectable } from '@angular/core';
import { CountyDataService } from '../api/county-data.service';

@Injectable({
    providedIn: 'root'
})

export class CountyService {
    constructor(private countyDataService: CountyDataService) { }

     //get All County
     public getAllCounty(data) {
        return this.countyDataService.getAllCounty(data);
    }

}