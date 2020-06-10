import { Component, OnInit } from '@angular/core';
import { AuthService } from '../core/AuthService';
import { ToastController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-tablon-respuestas',
  templateUrl: './tablon-respuestas.page.html',
  styleUrls: ['./tablon-respuestas.page.scss'],
})
export class TablonRespuestasPage implements OnInit {

  public comentarios: any;
  public respuestas: any;
  comment: string = '';
  response: string = '';
  loading : any;

  constructor(public authService: AuthService,
    public toastController: ToastController, private loadingCtrl: LoadingController) { }

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
    this.getComments();
  }

  getComments(){
    // Recoge todos los comentarios
    this.authService.getAllComments().subscribe(data => {
      this.comentarios = data.map
      (e => {
        return {
          id: e.payload.doc.id,
          username: e.payload.doc.data()['UserName'],
          comment: e.payload.doc.data()['Comment'],
          likes: e.payload.doc.data()['Likes'],
          
        };
      })
      this.hideLoading()
    });
  }

  private hideLoading(){
    // Hide the loading component
    this.loading.dismiss();
  }

  // Añadir un nuevo comentario

  addComment(): void {
    if (this.authService.isLogged) {
      let record = {};
      record['UserName'] = this.authService.currentUserName;
      record['Comment'] = this.comment;
      this.authService.createComment(record).then(response => {
        this.comment = '';
      }).catch(error => {
        console.log(error.message);
      });
    } else {
      console.log("No hay usuario identificado");
      this.presentToast();
    }
  }

  ionViewWillEnter(){
    this.showLoading()
  }



  // Toast en caso de no estar logueado
  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Tienes que iniciar sesión para poder publicar un comentario',
      duration: 2000,
      position: "top"
    });
    toast.present();
  }

}
