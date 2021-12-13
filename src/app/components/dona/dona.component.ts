import { Component, Input, OnInit } from '@angular/core';
import { ChartData, Color } from 'chart.js';


@Component({
  selector: 'app-dona',
  templateUrl: './dona.component.html',
  styles: [
  ]
})
export class DonaComponent implements OnInit{


    // Doughnut
    @Input('title') public titulo: string="";
    @Input('labels') public doughnutChartLabels: string[] = [];
    @Input('data') public data1:any = [];
    
    public doughnutChartData: ChartData<'doughnut'> = {
      labels: [ 'Download Sales', 'In-Store Sales', 'Mail-Order Sales' ],
      datasets: [ { data: [ 50, 150, 120 ] }]
    };

    ngOnInit(): void {
      this.doughnutChartData.labels = this.doughnutChartLabels
      this.doughnutChartData.datasets.push({data: this.data1});
    }

}
