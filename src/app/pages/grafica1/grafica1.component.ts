import { Component, OnInit } from '@angular/core';



@Component({
  selector: 'app-grafica1',
  templateUrl: './grafica1.component.html',
  styles: [
  ]
})
export class Grafica1Component {

  public labels1: string[] = [ 'Tacos', 'Chocolate', 'Miel' ];
  public data1: number[] = [ 200, 400, 600 ];
  

    /*public colors: Color[] = [
      { backgroundColor: [ '#6857E6', '#009FEE', '#F02059' ] }
    ];*/

}
