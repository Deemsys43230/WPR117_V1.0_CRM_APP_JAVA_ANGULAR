import { Component ,OnInit } from '@angular/core';
import { CountyService } from 'src/app/shared/services/county.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
public allCount : any;

constructor(private countyService : CountyService){}

ngOnInit(): void {
  this.getAllCount()
}

//Get All Counts for Dashboard
getAllCount(){
  this.countyService.getDashboardCount().subscribe(res => {
    this.allCount = {
      department : res["Total Department"],
      accounts : res["Total Accounts"],
      reports : res["Total Crash Reports"],
      occupants : res["Total Occupants"]
    }
  })
}





}
