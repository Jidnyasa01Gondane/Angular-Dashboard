import { Component, OnInit, ViewChild } from '@angular/core';
import {Observable} from 'rxjs';
import { HttpClient } from '@angular/common/http';


import { MatSort, MatTableDataSource,MatInputModule } from '@angular/material';
import {MatPaginator} from '@angular/material/paginator';

import { Data } from '../data.model';

@Component({
  selector: 'app-view-data',
  templateUrl: './view-data.component.html',
  styleUrls: ['./view-data.component.css']
})
export class ViewDataComponent implements OnInit {

  displayedColumns: string[] = ['Cluster', 'Servers', 'Application', 'Alias', 'DNS', 'Traffic', 
  'Category','Decission'];
  dataSource;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  siteArray: Data[] = [];
  length = 100;
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 25, 100];

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
      }
    );
    
  }

  getProducts(): Observable<any[]> {
    return this.httpClient.get<any[]> ('../../assets/DMZ_data.json');
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
