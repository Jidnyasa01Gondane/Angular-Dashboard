import { Component, OnInit } from '@angular/core';
import { GoogleChartService } from '../service/google-chart.service';

declare var require: any;
var jsonQuery = require('json-query');

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent implements OnInit {

  overviewData : any = [];

  constructor(private gcService: GoogleChartService) { }

  ngOnInit() {
    this.getOverviewData();
  }

  //overview component data is collectedd from here
  getOverviewData() {
    var siteArray: any;
    this.gcService.getData().subscribe(
      data => {
        siteArray = data["query"];
        //total data
        this.overviewData.push(siteArray.length);
        var decision = siteArray.map( 
          (value) => value.Decission).filter( 
          (value, index, _siteArray) => _siteArray.indexOf(value) == index);
        //console.log(decision);
        for (let entry of decision) {
          var decissionData = jsonQuery(['query[*Decission=?]',entry], {
            data: data }
            );
            this.overviewData.push(decissionData.value.length);
        }
          
          //console.log(this.overviewData);
      }
    );
    
  }
}
