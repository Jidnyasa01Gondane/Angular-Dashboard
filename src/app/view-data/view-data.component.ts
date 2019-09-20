import { Component, OnInit, ViewChild } from '@angular/core';
import {Observable} from 'rxjs';
import { HttpClient } from '@angular/common/http';


import { MatSort, MatTableDataSource,MatInputModule } from '@angular/material';
import {MatPaginator} from '@angular/material/paginator';

import { Data } from '../Shared/data.model';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-view-data',
  templateUrl: './view-data.component.html',
  styleUrls: ['./view-data.component.css']
})
export class ViewDataComponent implements OnInit {

  displayedColumns: string[] = [ 'Cluster','Servers','Application','DNS','Traffic',
    'Category','Decission'];

  dataSource;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  siteArray: Data[] = [];
  length: any;

  
  clusterFilter = new FormControl('');
  applicationFilter = new FormControl('');
  dnsFilter = new FormControl('');
  serverFilter = new FormControl('');
  categoryFilter = new FormControl('');
  trafficFilter = new FormControl('');
  decissionFilter = new FormControl('');

  filterValues = {
    Cluster: '',
    Application: '',
    DNS: '',
    Servers: '',
    Category: '',
    Traffic: '',
    Decission:''
  };

  constructor(private httpClient: HttpClient) {

  }

  ngOnInit() {
    this.getProducts().subscribe(
      data => {
        data = data["query"];
        this.siteArray = data;
        this.dataSource = new MatTableDataSource(this.siteArray);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        console.log("Loading data");
        console.log(this.dataSource);
        this.length = this.dataSource.length;
        this.dataSource.filterPredicate = this.tableFilter();
      }
    );

    this.clusterFilter.valueChanges
      .subscribe(
        cluster => {
          this.filterValues.Cluster = cluster;
          this.dataSource.filter = JSON.stringify(this.filterValues);
          
        }
      )
    this.applicationFilter.valueChanges
      .subscribe(
        application => {
          this.filterValues.Application = application;
          this.dataSource.filter = JSON.stringify(this.filterValues);
        }
      )
    this.dnsFilter.valueChanges
      .subscribe(
        dns => {
          this.filterValues.DNS = dns;
          this.dataSource.filter = JSON.stringify(this.filterValues);
        }
      )
    this.serverFilter.valueChanges
      .subscribe(
        server => {
          this.filterValues.Servers = server;
          this.dataSource.filter = JSON.stringify(this.filterValues);
        }
      )
    this.categoryFilter.valueChanges
      .subscribe(
        catgy => {
          this.filterValues.Category = catgy;
          this.dataSource.filter = JSON.stringify(this.filterValues);
        }
      )
    this.trafficFilter.valueChanges
      .subscribe(
        traffic => {
          this.filterValues.Traffic = traffic;
          this.dataSource.filter = JSON.stringify(this.filterValues);
        }
      )
    this.decissionFilter.valueChanges
      .subscribe(
        last => {
          this.filterValues.Decission = last;
          this.dataSource.filter = JSON.stringify(this.filterValues);
        }
      )
  }

  getProducts(): Observable<any[]> {
    return this.httpClient.get<any[]> ('../../assets/pr_dmz_list_updated.json');
  }

  /*flterCheck(){
    if(this.filter1){
      this.dataSource.filterPredicate = this.tableFilter();
    }
  }*/

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  tableFilter(): (data: any, filter: string) => boolean {
    
    let filterFunction = function(data, filter): boolean {
      let searchTerms = JSON.parse(filter);
      return data.Cluster.toLowerCase().indexOf(searchTerms.Cluster) !== -1
      && data.Servers.toLowerCase().indexOf(searchTerms.Servers) !== -1
      && data.Application.toLowerCase().indexOf(searchTerms.Application) !== -1
      && data.DNS.toLowerCase().indexOf(searchTerms.DNS) !== -1
      && data.Traffic.toString().toLowerCase().indexOf(searchTerms.Traffic) !== -1
      && data.Category.toLowerCase().indexOf(searchTerms.Category) !== -1
      && data.Decission.toString().toLowerCase().indexOf(searchTerms.Decission) !== -1
    }
    return filterFunction;
  } 
}
