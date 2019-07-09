import { Injectable } from '@angular/core';
import { ServiceModule } from './service.module';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import { PieData } from '../service/pie.model';

//import {json-query} from 'json-query';
declare var require: any;
declare  var  google:  any;
var jsonQuery = require('json-query');

@Injectable({
  providedIn: ServiceModule
})

export class GoogleChartService {

  applen: number;
  weblength: number;
  tbdlen: number;
  vanlen: number;
  private google : any;

  pieData: PieData[]= [];
  

  constructor(private httpClient: HttpClient) { 
    this.google = google;
  }

  getGoogle(){
    return this.google;
  }

  getData(): Observable<any[]> {
    return this.httpClient.get<any[]> ('../../../assets/pr_dmz_list.json');
  }

  getPieData():PieData[] {
    var siteArray: any;
    var catData: any;
    this.getData().subscribe(
      data => {
        siteArray = data["query"];
        var category = siteArray.map( (value) => value.Category).filter( 
          (value, index, _siteArray) => _siteArray.indexOf(value) == index);
        console.log(category);
        for (let entry of category) {
          catData = jsonQuery(['query[*Category=?]',entry], {
            data: data }
            );
            var obj = new PieData();
            obj.category = entry;
            obj.count = catData.value.length;
            this.pieData.push(obj);
        }
        console.log(this.pieData); 
      }
    );
    return this.pieData;
  }

}
