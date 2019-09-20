import { Component, OnInit } from '@angular/core';
import { GoogleChartService } from '../service/google-chart.service';
import { GraphData } from '../service/graph.model';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {

  private gLib: any;

  pieData: GraphData[]= [];

  constructor(private gChartService : GoogleChartService) { 
    this.gLib = this.gChartService.getGoogle();
    this.gLib.charts.load('current', {'packages':['corechart', 'controls','bar']});
    this.pieData = this.gChartService.getChartData();
    this.gLib.charts.setOnLoadCallback(this.drawChart.bind(this));
  }

  ngOnInit() {
  }

  private drawChart(){
    let dashboard = new this.gLib.visualization.Dashboard(document.getElementById('dashboard_div'));
    let data = new this.gLib.visualization.DataTable();
    data.addColumn('string', 'Category');
    data.addColumn('number', 'Application');
    data.addColumn('number', 'Website');
    data.addColumn('number', 'Vanity');

    for  (let item of this.pieData)
    {
        data.addRows([
          [item.category, item.subcategory[0].count, item.subcategory[1].count, item.subcategory[1].count]
        ]);
    }
    
    console.log(data);
    
    // Create a range slider, passing some options
    var donutRangeSlider = new this.gLib.visualization.ControlWrapper({
      'controlType': 'CategoryFilter',
      'containerId': 'filter_div',
      'options': {
        'filterColumnLabel': 'Category'
      }
    });

    // Create a pie chart, passing some options
    var pieChart = new this.gLib.visualization.ChartWrapper({
      'chartType': 'ColumnChart',
      'containerId': 'chart_div',
      'options': {
        'title':'Cluster-Wise Distribution',
        'width': '100%',
        'height': 530,
      }
    });
    
    dashboard.bind(donutRangeSlider, pieChart);
    /*let options = {
      'title':'Category-Wise Distribution',
        'is3D': true,
        'width': '100%',
        'height': '750px',};*/
    dashboard.draw(data);
  }

}
