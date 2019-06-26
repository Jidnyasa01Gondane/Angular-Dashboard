import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { MatMenuTrigger } from '@angular/material';

@Component({
  selector: 'filter-template',
  templateUrl: './filter-template.component.html',
  styleUrls: ['./filter-template.component.css']
})
export class FilterTemplateComponent implements OnInit {

  @ViewChild('filterMenu') triggerMenu: MatMenuTrigger;
  @Input() openFilter: boolean;

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(){

    if(this.openFilter) {
       this.triggerMenu.openMenu()
     }
   }

}
