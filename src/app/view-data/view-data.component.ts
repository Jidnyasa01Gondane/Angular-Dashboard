import { Component, OnInit, ViewChild } from '@angular/core';
import {Observable} from 'rxjs';
import { HttpClient } from '@angular/common/http';


import { MatSort, MatTableDataSource,MatInputModule } from '@angular/material';
import {MatPaginator} from '@angular/material/paginator';

import { Data } from '../data.model';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-view-data',
  templateUrl: './view-data.component.html',
  styleUrls: ['./view-data.component.css']
})
export class ViewDataComponent implements OnInit {

  displayedColumns: string[] = [ 'Cluster','Application','Alias','DNS','DocRoot','Servers',
    'Category','ApacheVersion','Context','OS','Traffic', 'LastDeployed','FileSize',
    'FIleExtersion','SSL'];

  dataSource;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  siteArray: Data[] = [];
  length: any;


  clusterFilter = new FormControl('');
  applicationFilter = new FormControl('');
  aliasFilter = new FormControl('');
  dnsFilter = new FormControl('');
  docrootFilter = new FormControl('');
  serverFilter = new FormControl('');
  categoryFilter = new FormControl('');
  apacheFilter = new FormControl('');
  contextFilter = new FormControl('');
  osFilter = new FormControl('');
  trafficFilter = new FormControl('');
  lastFilter = new FormControl('');
  sizeFilter = new FormControl('');
  extFilter = new FormControl('');
  sslFilter = new FormControl('');

  filterValues = {
    Cluster: '',
    Application: '',
    Alias: '',
    DNS: '',
    DocRoot: '',
    Servers: '',
    Category: '',
    ApacheVersion: '',
    Context: '',
    OS: '',
    Traffic: '',
    LastDeployed:'',
    FileSize:'',
    FIleExtersion:'',
    SSL:''
  };

  constructor(private httpClient: HttpClient) {

  }

  ngOnInit() {
    this.getProducts().subscribe(
      data => {
        //data = data["query"];
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
    this.aliasFilter.valueChanges
      .subscribe(
        alias => {
          this.filterValues.Alias = alias;
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
    this.docrootFilter.valueChanges
      .subscribe(
        root => {
          this.filterValues.DocRoot = root;
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
  }

  getProducts(): Observable<any[]> {
    return this.httpClient.get<any[]> ('../../assets/pr_dmz_list.json');
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  tableFilter(): (data: any, filter: string) => boolean {
    let filterFunction = function(data, filter): boolean {
      let searchTerms = JSON.parse(filter);
      return data.Cluster.toLowerCase().indexOf(searchTerms.Cluster) !== -1
      && data.Application.toLowerCase().indexOf(searchTerms.Application) !== -1
      && data.Alias.toLowerCase().indexOf(searchTerms.Alias) !== -1
      && data.DNS.toLowerCase().indexOf(searchTerms.DNS) !== -1
      && data.DocRoot.toLowerCase().indexOf(searchTerms.DocRoot) !== -1
      && data.Servers.toLowerCase().indexOf(searchTerms.Servers) !== -1
      && data.Category.toLowerCase().indexOf(searchTerms.Category) !== -1
      && data.ApacheVersion.toLowerCase().indexOf(searchTerms.ApacheVersion) !== -1
      && data.Context.toLowerCase().indexOf(searchTerms.Context) !== -1
      && data.OS.toLowerCase().indexOf(searchTerms.OS) !== -1
      && data.Traffic.toLowerCase().indexOf(searchTerms.Traffic) !== -1
      && data.LastDeployed.toLowerCase().indexOf(searchTerms.LastDeployed) !== -1
      && data.FileSize.toLowerCase().indexOf(searchTerms.Application) !== -1
      && data.FIleExtersion.toLowerCase().indexOf(searchTerms.Application) !== -1
      && data.SSL.toLowerCase().indexOf(searchTerms.Application) !== -1
    }
    return filterFunction;
  } 
}
