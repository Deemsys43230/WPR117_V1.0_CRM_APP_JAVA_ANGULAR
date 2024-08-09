import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { navItems } from '../../nav'
import * as $ from 'jquery';

@Component({
  selector: 'app-default-layout',
  templateUrl: './default-layout.component.html',
  styleUrls: ['./default-layout.component.scss']
})
export class DefaultLayoutComponent implements OnInit {
  public active: string | undefined;
  public navItems: any;
  public role: any;
  public currentYear :any;
  public username : any;
  constructor(public router: Router) { }


  ngOnInit(): void {

    // Toggle Sidebar menu Button
    const $button = document.querySelector('#sidebar-toggle');
    const $wrapper = document.querySelector('#wrapper');

    if ($button && $wrapper) {
      $button.addEventListener('click', (e) => {
        e.preventDefault();
        $wrapper.classList.toggle('toggled');
      });
    }
    //Calculate current year
    var currentDate = new Date()
    this.currentYear = currentDate.getFullYear()

    //Get username
    this.username = localStorage.getItem("userName")

    // For active url
    const moduleUrl = this.router.url.split('/');
    this.active = moduleUrl.slice(2).join('/');

    //Displaying menu based on roles
    this.role = localStorage.getItem('role')
    if (this.role === 'ROLE_SUPER_ADMIN') {
      this.navItems = new navItems().superAdminNavItems
      //  this.profileName = "Super Admin"
    }
    if (this.role === 'ROLE_ADMIN') {
      //  this.navItems = new navItems().lawyerAdminNavItems
      //  this.profileName = "Lawyer Admin"
    }
    if (this.role === 'ROLE_CALLER_ADMIN') {
      //  this.navItems = new navItems().callerAdminNavItems
      //  this.profileName = "Caller Admin"
    }
    else {
      this.navItems = new navItems().superAdminNavItems
    }
  }

  //Receiving url from choosing the menu
  activeUrl(url: any) {
    this.active = url
  }
}  