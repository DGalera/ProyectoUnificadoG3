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
  @ViewChild('donorsBarChart') donorsBarChart;
  @ViewChild('teamsBarChart') teamsBarChart;
  @ViewChild('donor') donorSearchbar;
  @ViewChild('team') teamSearchbar;

  donorsBars: any;
  teamsBars: any;
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

  private topTeams:  Array<ITeam> = [];
  private topTeamsName: string[] = [];
  private topTeamsCredit: number[] = [];

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
    this.getAsyncDonors();
    this.getAsyncTeams();
  }

  private getAsyncDonors() {

    this.apiService.get_Donors().subscribe(
      (data: any) => {
        this.donors = data.results,         
        this.createDonorsBarChart(),
        this.hideLoading();
      }
    );

    return this.donors;

    
  }

  private getAsyncTeams() {

    this.apiService.get_Teams().subscribe(
      (data: any) => {
        this.teams = data.results,         
        this.createTeamsBarChart(),
        this.hideLoading();
      }
    );

    return this.teams;

    
  }

  

  private hideLoading(){
    // Hide the loading component
    this.loading.dismiss();
  }


  getTopDonorsName(){
    this.topDonors = this.donors.slice(0,10);
    for (let i = 0; i < this.topDonors.length; i++) {
      this.topDonorsName[i]=this.topDonors[i].name;
      console.log(this.topDonors[i].name); 
    }
    console.log(this.topDonorsName);
  }


  getTopDonorsCredit(){
  this.topDonors = this.donors.slice(0,10);
    for (let i = 0; i < this.topDonors.length; i++) {
      this.topDonorsCredit[i]=this.topDonors[i].credit;
    }
    console.log(this.topDonorsCredit);
  }

  getTopTeamsName(){
    this.topTeams = this.teams.slice(0,10);
    for (let i = 0; i < this.topTeams.length; i++) {
      this.topTeamsName[i] = this.topTeams[i].name;
      console.log(this.topTeams[i].name); 
    }
    console.log(this.topTeamsName);
  }


  getTopTeamsCredit(){
    this.topTeams = this.teams.slice(0,10);
    for (let i = 0; i < this.topTeams.length; i++) {
      this.topTeamsCredit[i] = this.topTeams[i].credit;
    }
    console.log(this.topTeamsCredit);
  }


  
  ionViewWillEnter(){
    this.showLoading()
  }

  
  createDonorsBarChart() {
    this.getTopDonorsName();
    this.getTopDonorsCredit();
      this.donorsBars = new Chart(this.donorsBarChart.nativeElement, {
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
    createTeamsBarChart() {
      this.getTopTeamsName();
      this.getTopTeamsCredit();
        this.teamsBars = new Chart(this.teamsBarChart.nativeElement, {
          type: 'bar',
          data: {
            labels: this.topTeamsName,
            datasets: [{
              label: 'Top Teams Credits',
              data: this.topTeamsCredit,
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


      searchDonor(name: string){
        this.donorSearchbar.value="";
        this.route.navigate(['donor', name]);
      }

      searchTeam(id: number){
        this.teamSearchbar.value="";
        this.route.navigate(['team', id]);
      }

}
