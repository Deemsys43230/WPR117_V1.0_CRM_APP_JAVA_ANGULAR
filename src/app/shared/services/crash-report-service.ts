import { Injectable } from '@angular/core';
import { CrashReportDataService } from '../api/crash-report-data.service';

@Injectable({
    providedIn: 'root'
})

export class CrashReportService {
    constructor(private crashReportDataService: CrashReportDataService) { }

     //Save crash report
     public saveCrashReport(data) {
        return this.crashReportDataService.saveCrashReport(data);
    }

    //Update crash report
    public updateCrashReport(data, id) {
        return this.crashReportDataService.updateCrashReport(data, id);
    }
}