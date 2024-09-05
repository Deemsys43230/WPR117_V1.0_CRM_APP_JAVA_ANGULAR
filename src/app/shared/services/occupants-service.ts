import { Injectable } from '@angular/core';
import { OccupantsDataService } from '../api/occupants-data.service';

@Injectable({
    providedIn: 'root'
})

export class OccupantsService {
    constructor(private occupantsDataService: OccupantsDataService) { }

    //get All occupants
    public getAllOccupants(data) {
        return this.occupantsDataService.getAllOccupants(data);
    }

    //delete crash report
    public deleteCrashReport(id) {
        return this.occupantsDataService.deleteCrashReport(id);
    }

    //get by id
    public getByIdCrashReport(id) {
        return this.occupantsDataService.getByIdCrashReport(id);
    }

    //check report number exists
    public checkReportNumber(data) {
        return this.occupantsDataService.checkReportNumber(data);
    }

    //get all search crash reports details by pagination
    public getAllSearchCrashReports(data) {
        return this.occupantsDataService.getAllSearchCrashReports(data);
    }

    //save client IP in crash report restriction
    public saveClientIP(data) {
        return this.occupantsDataService.saveClientIP(data);
    }
}