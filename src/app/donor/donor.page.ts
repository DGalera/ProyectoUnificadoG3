import { Component, OnInit } from '@angular/core';
import { IDonor, ITeam } from '../share/interfaces';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../api/api.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-donor',
  templateUrl: './donor.page.html',
  styleUrls: ['./donor.page.scss'],
})
export class DonorPage implements OnInit {
  public name: string;
  public donor: IDonor;
  donorExists = false;
  error = false;
  public teams: ITeam[];
  numTimesLeft = 0;
  firstTime: boolean;
  rangeInitial = 0;
  rangeFinal = 6;
  rest = 0;
  lastRound = false;
  smallerThanSix: boolean;



  constructor(
    private activatedrouter: ActivatedRoute,
    private router: Router,
    private apiService: ApiService,
    public toastController: ToastController

  ) { this.teams = [], this.firstTime = true, this.smallerThanSix = false }



  ngOnInit() {
    this.name = this.activatedrouter.snapshot.params.name;

    this.apiService.get_Donor(this.name).subscribe(
      (data: any) => {
        this.donor = data
        this.donorExists = true
        this.error = false
        this.addMoreTeams()
      },
      (err) => {
        console.log("Error: Donor not found")
        this.donorExists = false
        this.error = true;
      }
    )

  }

  doInfinite(infiniteScroll) {
    console.log('Begin async operation');

    setTimeout(() => {
      console.log('Async operation has ended');
      this.addMoreTeams();
      infiniteScroll.target.complete();
    }, 500);

  }

  addMoreTeams() {
    if (this.firstTime == true) {
      if(this.donor.teams.length<6){
        this.smallerThanSix = true
        for (let i = 0; i < this.donor.teams.length; i++) {
          this.teams.push(this.donor.teams[i]);
        }
      }else{
        this.numTimesLeft = Math.trunc(this.donor.teams.length / 6);
        this.rest = this.donor.teams.length % 6;
        
      }
      
    }

    this.firstTime = false
    
    if(!this.smallerThanSix){
      for (let i = this.rangeInitial; i < this.rangeFinal; i++) {
        this.teams.push(this.donor.teams[i]);
      }
  
      if(this.lastRound==true){
        this.rest=0
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
