import { Employee } from './../entity/employee';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-listemployees',
  templateUrl: './listemployees.component.html',
  styleUrls: ['./listemployees.component.css']
})
export class ListemployeesComponent implements OnInit {



  list: Employee[] = [];
  listToDisplay:Employee[]=[];
  competencies = [1, 2, 3, 4, 5];
  constructor(private http: HttpClient) { }
   ngOnInit() {
     this.http.get("../../assets/emplist.csv", { responseType: 'text' }).subscribe(data => {
      this.list = this.stringToJson(data);
      this.list.pop();
      console.log(this.list)
    });
  }

  filterOnly(event: Event) {
    this.listToDisplay=[];
    this.list.forEach(emp=>{
      if(emp[3].trim()==event.srcElement.text.trim())
         this.listToDisplay.push(emp);
    })
   
  }
  stringToJson(data: String): any[] {
    let arr: any[] = [];
    let temp = data.split("\n");
    temp.forEach(d => {
      arr.push(d.split(","));
    });
    return arr;
  }
}
