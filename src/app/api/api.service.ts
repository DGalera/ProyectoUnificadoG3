import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, throwError, from } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { IDonor, ITeam } from '../share/interfaces';
import { HTTP } from '@ionic-native/http/ngx';
import { Platform, LoadingController } from '@ionic/angular';
import {finalize } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private proxyURL : string = "https://cors-anywhere.herokuapp.com/";
  private apiURL = 'https://stats.foldingathome.org/api'
  constructor(
    private http: HttpClient,
    private nativeHttp: HTTP,
    private plt: Platform,
    private loadingCtrl: LoadingController
  ) { }

  /*async get_Donors(){
    let loading = await this.loadingCtrl.create();
    await loading.present();

    let nativeCall = this.nativeHttp.get(this.apiURL + 'donors', {}, {
      'Content-Type': 'application/json'
    })

    from(nativeCall).pipe(
      finalize(() => loading.dismiss())
    )
    .subscribe(data=> {
      console.log('native data: ', data);
      this.donors = JSON.parse(data.data)
    }, err=> {
      console.log('JS Call error')
    })
  }*/
   get_Donors(){
    return this.http.get(this.proxyURL + this.apiURL + '/donors').pipe(
      tap(data=> console.log(JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  get_Teams(){
    return this.http.get(this.proxyURL + this.apiURL + '/teams').pipe(
      tap(data=> console.log(JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  private handleError(err) {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    let errorMessage: string;
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = `Backend returned code ${err.status}: ${err.body.error}`;
    }
    console.error(err);
    return throwError(errorMessage);
  }
}
