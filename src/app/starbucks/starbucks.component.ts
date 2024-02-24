import { Component, OnInit } from '@angular/core';
import { ApiService } from '../servicios/api.service';
import { fromEvent, scan } from 'rxjs';




@Component({
  selector: 'app-starbucks',
  templateUrl: './starbucks.component.html',
  styleUrls: ['./starbucks.component.css']
})

export class StarbucksComponent implements OnInit {



  datas:any={};

  constructor(private apiService:ApiService){}

  ngOnInit(): void {
    this.llenarData();

  }

  llenarData(){
    this.apiService.getData().subscribe(datas=>{
      this.datas=datas;
      console.log(this.datas);
    })
  }

}
