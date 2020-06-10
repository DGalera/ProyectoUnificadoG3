import { Component, OnInit } from '@angular/core';
import { ITeam, IDonor } from '../share/interfaces';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../api/api.service';
import { ToastController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-team',
  templateUrl: './team.page.html',
  styleUrls: ['./team.page.scss'],
})
export class TeamPage implements OnInit {
  public id: number;
  public team: ITeam;
  public donors: IDonor[];

  teamExists = false;
  error = false;
  
  rest=0;
  numTimesLeft=0;

  firstTime: boolean;
  smallerThanSix: boolean;
  lastRound = false;

  rangeInitial = 0;
  rangeFinal = 6;

  loading : any;
  comments: string = '';
  
  constructor(
    private activatedrouter: ActivatedRoute,
    private router: Router,
    private apiService: ApiService,
    public toastController: ToastController,
    private loadingCtrl: LoadingController

  ) { this.donors = [], this.firstTime = true, this.smallerThanSix = false }


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
    this.getTeam();

  }

  ionViewWillEnter(){
    this.showLoading()
  }

  getTeam(){
    this.id = this.activatedrouter.snapshot.params.id;
    this.apiService.get_Team(this.id).subscribe(
      (data: any) => {
        this.team = data
        this.teamExists = true
        this.error = false
        this.addMoreDonors()
        this.hideLoading()
      },
      (err) => {
        console.log("Error: Team not found")
        this.teamExists = false
        this.error = true
        this.hideLoading();
      }
    )

    return this.team
  }

  private hideLoading(){
    // Hide the loading component
    this.loading.dismiss();
  }

  doInfinite(infiniteScroll) {
    console.log('Begin async operation');

    setTimeout(() => {
      console.log('Async operation has ended');
      this.addMoreDonors();
      infiniteScroll.target.complete();
    }, 500);

  }

  addMoreDonors() {

    if (this.firstTime == true) {
      if (this.team.donors.length < 6) {
        this.smallerThanSix = true
        for (let i = 0; i < this.team.donors.length; i++) {
          this.donors.push(this.team.donors[i]);
        }
      } else {
        this.numTimesLeft = Math.trunc(this.team.donors.length / 6);
        this.rest = this.team.donors.length % 6;
        console.log(this.rest)
        
      }

    }

    this.firstTime = false

    if (!this.smallerThanSix) {
      for (let i = this.rangeInitial; i < this.rangeFinal; i++) {
        this.donors.push(this.team.donors[i]);
      }

      if (this.lastRound == true) {
        this.rest = 0
      }

      this.numTimesLeft -= 1
      console.log(this.numTimesLeft)

      if (this.numTimesLeft <= 0) {
        this.rangeFinal += this.rest
        this.lastRound = true;
        console.log("Last round")
      } else {
        this.rangeFinal += 6
      }
      this.rangeInitial += 6

    }
  }


}
