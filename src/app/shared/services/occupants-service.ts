import { Injectable } from '@angular/core';
import { OccupantsDataService } from '../api/occupants-data.service';

@Injectable({
    providedIn: 'root'
})

export class OccupantsService {
    constructor(private occupantsDataService: OccupantsDataService) { }

    //get All County
    public getAllOccupants(data) {
        return this.occupantsDataService.getAllOccupants(data);
    }

}