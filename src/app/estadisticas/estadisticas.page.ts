import { Component, OnInit,ViewChild } from '@angular/core';
import { IDonor, ITeam } from '../share/interfaces';
import { ApiService } from '../api/api.service';
import { Router } from '@angular/router';
import { Chart } from 'chart.js';
import { callbackify } from 'util';

@Component({
  selector: 'app-estadisticas',
  templateUrl: './estadisticas.page.html',
  styleUrls: ['./estadisticas.page.scss'],
})
export class EstadisticasPage implements OnInit {
  @ViewChild('barChart') barChart;

  bars: any;
  colorArray: any;

  public donors: IDonor[];
  public teams: ITeam[];

  private topDonors:  Array<IDonor>;
  private topDonorsName: string[];
  private topDonorsCredit: number[];
  dataLoaded = false;
  constructor(private apiService: ApiService, private route: Router) { }

  ngOnInit() {
    
  this.retrieveValues();
  }

  retrieveValues(){
    
   
     this.apiService.get_Donors().subscribe(
      (data: any) => {
        this.donors = data.results,
        this.dataLoaded=true;
      }

    );
    return this.donors;
  }

  getTopDonorsName(){
    
    this.topDonors = this.donors.slice(0,10);

    for (let i = 0; i < this.topDonors.length; i++) {
      this.topDonorsName.push(this.topDonors[i].name)
      
    }
    console.log(this.topDonorsName);
  }
  getTopDonorsCredit(){
 
  this.topDonors = this.donors.slice(0,10);
    for (let i = 0; i < this.topDonors.length; i++) {
      this.topDonorsCredit.push(this.topDonors[i].credit)
      
    }
    console.log(this.topDonorsCredit);
  }
  ionViewDidEnter() {
    
 
   
    this.createBarChart();

  }

  createBarChart() {
    this.getTopDonorsName();
    this.getTopDonorsCredit();
    this.bars = new Chart(this.barChart.nativeElement, {
      type: 'bar',
      data: {
        labels: this.topDonorsName,
        datasets: [{
          label: 'Top Donator Credits',
          data: this.topDonorsCredit,
          backgroundColor: 'rgb(255,165,0)', // array should have same number of elements as number of dataset
          borderColor: 'rgb(255,165,0)',// array should have same number of elements as number of dataset
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });
  }

}
