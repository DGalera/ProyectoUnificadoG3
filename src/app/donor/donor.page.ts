import { Component, OnInit } from '@angular/core';
import { IDonor } from '../share/interfaces';
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

  constructor(
    private activatedrouter: ActivatedRoute,
    private router: Router,
    private apiService: ApiService,
    public toastController: ToastController
    
  ) { }

  ngOnInit() {
    this.name = this.activatedrouter.snapshot.params.name;

    this.apiService.get_Donor(this.name).subscribe(
      (data: any) =>{
        this.donor = data
        this.donorExists = true
        this.error = false
      },
      (err) =>{
        console.log("Error: Donor not found")
        this.donorExists = false
        this.error = true;
      } 
    )
  }

}
