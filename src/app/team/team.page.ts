import { Component, OnInit } from '@angular/core';
import { ITeam, IDonor } from '../share/interfaces';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../api/api.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-team',
  templateUrl: './team.page.html',
  styleUrls: ['./team.page.scss'],
})
export class TeamPage implements OnInit {

  public id: number;
  public team: ITeam;
  teamExists = false;
  error = false;
  public donors: IDonor[];
  numTimesLeft;
  firstTime: boolean;
  rangeInitial = 0;
  rangeFinal = 6;
  rest;
  lastRound = false;
  smallerThanSix: boolean;


  constructor(
    private activatedrouter: ActivatedRoute,
    private router: Router,
    private apiService: ApiService,
    public toastController: ToastController
  ) { this.donors = [], this.firstTime = true, this.smallerThanSix = false }


  ngOnInit() {
    this.id = this.activatedrouter.snapshot.params.id;
    this.apiService.get_Team(this.id).subscribe(
      (data: any) => {
        this.team = data
        this.teamExists = true
        this.error = false
        this.addMoreDonors()
      },
      (err) => {
        console.log("Error: Team not found")
        this.teamExists = false
        this.error = true;
      }
    )
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
