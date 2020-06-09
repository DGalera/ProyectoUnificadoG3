import { Component, OnInit } from '@angular/core';
import { ITeam } from '../share/interfaces';
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

  constructor(
    private activatedrouter: ActivatedRoute,
    private router: Router,
    private apiService: ApiService,
    public toastController: ToastController
  ) { }

  ngOnInit() {
    this.id = this.activatedrouter.snapshot.params.id;
    this.apiService.get_Team(this.id).subscribe(
      (data: any) =>{
        this.team = data
        this.teamExists = true
        this.error = false
      },
      (err) =>{
        console.log("Error: Team not found")
        this.teamExists = false
        this.error = true;
      } 
    )
  }

}
