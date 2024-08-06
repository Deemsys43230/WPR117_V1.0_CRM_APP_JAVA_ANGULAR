import { Injectable } from '@angular/core';
import { AddNewAccountDataService } from '../api/add-new-account-data.service';

@Injectable({
    providedIn: 'root'
})

export class AddNewAccountService {
    constructor(private addNewAccountDataService: AddNewAccountDataService) { }

    //Add new account
    public addNewAccountData(data) {
        return this.addNewAccountDataService.addNewAccountData(data);
    }

    //Get by id account
    public getByIdAccountData(id) {
        return this.addNewAccountDataService.getByIdAccountData(id);
    }

    //Update account
    public updateAccountData(id, data) {
        return this.addNewAccountDataService.updateAccountData(id, data);
    }
}