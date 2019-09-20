import { Component, OnInit } from '@angular/core';
import { GoogleChartService } from '../service/google-chart.service';
import { GraphData } from '../service/graph.model';
import { NONE_TYPE } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-barchart',
  templateUrl: './barchart.component.html',
  styleUrls: ['./barchart.component.css']
})
export class BarchartComponent implements OnInit {

  private gLib: any;

  barData: GraphData[]= [];

  constructor(private gChartService : GoogleChartService) { 
    this.gLib = this.gChartService.getGoogle();
    this.gLib.charts.load('current', {'packages':['corechart','bar']});
    this.barData = this.gChartService.getBarData();
    this.gLib.charts.setOnLoadCallback(this.drawChart.bind(this));
  }

  ngOnInit() {
  }

  private drawChart(){
    let chart = new this.gLib.visualization.BarChart(document.getElementById('divBarChart'));
    let data = new this.gLib.visualization.DataTable();
    data.addColumn('string', 'Decission');
    data.addColumn('number', 'Count');
    data.addColumn({type:'string', role:'style'});
    let color = ['#3366cc','#dc3912','#ff9900'];
    let i = 0;
    for(let item of this.barData)
    {
      data.addRows([
        [item.category, item.count, color[i]]
      ]);
      i++;
    }
    

    let options = {
      'title':'Decission Distribution',
        'width': '100%',
        'height': '550px',
        'bar' : 'horizontal',
        'animation' : {
          'startup': 'true',
          'easing': 'linear',
          'duration': 15000}
        };
    chart.draw(data, options);
  }
  
}
