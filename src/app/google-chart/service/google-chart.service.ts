import { Injectable } from '@angular/core';
import { ServiceModule } from './service.module';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import { GraphData } from './graph.model';

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

  pieData: GraphData[]= [];
  barData: GraphData[]= [];
  chartData: GraphData[]= [];
  subchartData: any = [];

  constructor(private httpClient: HttpClient) { 
    this.google = google;
  }

  getGoogle(){
    return this.google;
  }

  getData(): Observable<any[]> {
    return this.httpClient.get<any[]> ('./assets/pr_dmz_list_updated.json');
  }

  getPieData():GraphData[] {
    var siteArray: any;
    var catData: any;
    //this.pieData = [];
    //console.log(this.pieData);
    this.getData().subscribe(
      data => {
        siteArray = data["query"];
        var category = siteArray.map( (value) => value.Category).filter( 
          (value, index, _siteArray) => _siteArray.indexOf(value) == index);
        //console.log(category);
        for (let entry of category) {
          catData = jsonQuery(['query[*Category=?]',entry], {
            data: data }
            );
            var obj = new GraphData();
            obj.category = entry;
            obj.count = catData.value.length;
            this.pieData.push(obj);
        }
        //console.log(this.pieData); 
      }
    );
    return this.pieData;
  }

  getBarData():GraphData[] {
    var siteArray: any;
    var decData: any;
    this.getData().subscribe(
      data => {
        siteArray = data["query"];
        var decission = siteArray.map( (value) => value.Decission).filter( 
          (value, index, _siteArray) => _siteArray.indexOf(value) == index);
        //console.log(decission);
        for (let entry of decission) {
          decData = jsonQuery(['query[*Decission=?]',entry], {
            data: data }
            );
            var obj = new GraphData();
            obj.category = entry;
            obj.count = decData.value.length;
            this.barData.push(obj);
        }
        //console.log(this.barData); 
      }
    );
    return this.barData;
  }


  getChartData():GraphData[] {
    var siteArray: any;
    var catData: any;
    var clusterData: any;
    this.getData().subscribe(
      data => {
        siteArray = data["query"];
        var cluster = siteArray.map( (value) => value.Cluster).filter( 
          (value, index, _siteArray) => _siteArray.indexOf(value) == index);
        var category = siteArray.map( (value) => value.Category).filter( 
            (value, index, _siteArray) => _siteArray.indexOf(value) == index);
        //console.log(category);
        //console.log(cluster);
        for (let entry of cluster) {
          clusterData = jsonQuery(['query[*Cluster=?]',entry], {
            data: data });
            //console.log(clusterData);
            var obj = new GraphData();
            obj.category = entry;
            obj.count = clusterData.value.length;
            this.subchartData = [];
            for (let item of category) {
              catData = jsonQuery(['[*Category=?]',item], {
              data: clusterData.value });
              //console.log(catData);
              var obj1 = new GraphData();
              obj1.category = item;
              obj1.count = catData.value.length;
              this.subchartData.push(obj1);
            }
            obj.subcategory = this.subchartData;
            this.chartData.push(obj);
        }
        console.log(this.chartData); 
      }
    );
    return this.chartData;
  }
}