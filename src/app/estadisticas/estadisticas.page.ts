import { Component, OnInit,ViewChild } from '@angular/core';
import { IDonor, ITeam } from '../share/interfaces';
import { ApiService } from '../api/api.service';
import { Router } from '@angular/router';
import { Chart } from 'chart.js';
import { callbackify } from 'util';
import { LoadingController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-estadisticas',
  templateUrl: './estadisticas.page.html',
  styleUrls: ['./estadisticas.page.scss'],
})
export class EstadisticasPage implements OnInit {
  @ViewChild('barChart') barChart;

  bars: any;
  colorArray: any;

  loading : any;
  comments: string = '';

  function1 = false;
  function2 = false;

  public donors: IDonor[];
  public teams: ITeam[];

  private topDonors:  Array<IDonor> = [];
  private topDonorsName: string[] = [];
  private topDonorsCredit: number[] = [];
  dataLoaded = false;
  constructor(private apiService: ApiService, private route: Router, private nav: NavController, private loadingCtrl: LoadingController) { }

  ngOnInit() {
    
  }

  async showLoading() {
    this.loading= await this.loadingCtrl.create({
      spinner: "crescent",
      message: "Cargando...",
      cssClass: "loader-class"

      
    });
    // Show the loading page
    this.loading.present()
    // Get the Async information 
    this.getAsyncData();
  }

  private getAsyncData() {

    this.apiService.get_Donors().subscribe(
      (data: any) => {
        this.donors = data.results,    
        this.dataLoaded=true,
        this.hideLoading(),
        this.createBarChart();
      }
    );

    return this.donors;

    
  }


  private hideLoading(){
    // Hide the loading component
    this.loading.dismiss();
  }


  getTopDonorsName(){
    this.topDonors = this.donors.slice(0,10);
    for (let i = 0; i < this.topDonors.length; i++) {
      this.topDonorsName.push(this.topDonors[i].name);
      console.log(this.topDonors[i].name); 
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


  
  ionViewWillEnter(){
    this.showLoading()
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
