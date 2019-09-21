import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, MatPaginator, MatTableDataSource } from '@angular/material';
import { Data } from '../Shared/data.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.css']
})
export class DataTableComponent implements OnInit {

  displayedColumns: string[] = [ 'Cluster','Servers','Application','DNS','Traffic',
    'Category','Decission'];
  expandedElement: Data | null;

  dataSource;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  siteArray: Data[] = [];
  length: any;
  loading: boolean = false;

  constructor(private httpClient: HttpClient) { }

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
        this.loading = true;
        //this.dataSource.filterPredicate = this.tableFilter();
      }
    );
  }

  getProducts(): Observable<any[]> {
    return this.httpClient.get<any[]> ('assets/pr_dmz_list_updated.json');
  }

}
