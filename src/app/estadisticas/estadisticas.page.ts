import { Component, OnInit } from '@angular/core';
import { IDonor, ITeam } from '../share/interfaces';
import { ApiService } from '../api/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-estadisticas',
  templateUrl: './estadisticas.page.html',
  styleUrls: ['./estadisticas.page.scss'],
})
export class EstadisticasPage implements OnInit {

  public donors: IDonor[];
  public teams: ITeam[];

  constructor(private apiService: ApiService, private route: Router) { }

  ngOnInit() {
    this.retrieveValues();
  }

  retrieveValues(){
    this.apiService.get_Donors().subscribe(
      (data: any) => this.donors = data.results
    );

  }
 

}
