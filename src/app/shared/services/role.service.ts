import { Injectable } from '@angular/core';
import { RoleDataService } from '../api/role-data-service';

@Injectable({
    providedIn: 'root'
})

export class RoleService {
    constructor(private roleDataService: RoleDataService) { }

    //get All Roles
    public getAllRoles() {
        return this.roleDataService.getAllRoles();
    }

}