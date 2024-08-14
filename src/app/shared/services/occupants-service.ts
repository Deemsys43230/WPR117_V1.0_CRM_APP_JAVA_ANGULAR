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
}