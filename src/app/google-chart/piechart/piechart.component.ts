import { Component, OnInit } from '@angular/core';
import { GoogleChartService } from '../service/google-chart.service';
import { GraphData } from '../service/graph.model';

@Component({
  selector: 'app-piechart',
  templateUrl: './piechart.component.html',
  styleUrls: ['./piechart.component.css']
})
export class PiechartComponent implements OnInit {

  private gLib: any;

  pieData: GraphData[]= [];

  constructor(private gChartService : GoogleChartService) { 
    this.gLib = this.gChartService.getGoogle();
    this.gLib.charts.load('current', {'packages':['corechart','table']});
    this.pieData = this.gChartService.getPieData();
    this.gLib.charts.setOnLoadCallback(this.drawChart.bind(this));
  }

  ngOnInit() {
  }

  private drawChart(){
    let chart = new this.gLib.visualization.PieChart(document.getElementById('divPieChart'));
    let data = new this.gLib.visualization.DataTable();
    data.addColumn('string', 'Category');
    data.addColumn('number', 'Count');
    for  (let item of this.pieData)
    {
      data.addRows([
        [item.category, item.count]
      ]);
    }
    

    let options = {
      'title':'Category-Wise Distribution',
        'is3D': true,
        'width': '100%',
        'height': '550px',};
    chart.draw(data, options);
  }
}
