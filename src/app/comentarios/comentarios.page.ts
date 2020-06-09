import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from '../core/AuthService';
import { ToastController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-comentarios',
  templateUrl: './comentarios.page.html',
  styleUrls: ['./comentarios.page.scss'],
})
export class ComentariosPage implements OnInit {
  public respuestas : any;
  response: string = '';
  showed = false;

  @Input() comment: any;
  @Input() comentarios: any;

  
  constructor(public authService: AuthService,
    public toastController: ToastController,
    public alertController: AlertController) { }

  ngOnInit() {
  }

  // Añadir un nuevo comentario
  addComment(): void {
    if (this.authService.isLogged) {
      let record = {};
      record['UserName'] = this.authService.currentUserName;
      record['Comment'] = this.comment;
      this.authService.createComment(record).then(response => {
        this.comment = '';
        console.log(response);
      }).catch(error => {
        console.log(error.message);
      });
    } else {
      console.log("No hay usuario identificado");
      this.presentToast();
    }
  }

  // Mensaje de error en caso de no estar logueado
  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Tienes que iniciar sesión para poder publicar un comentario',
      duration: 2000,
      position: "top"
    });
    toast.present();
  }

  // Respuestas de un comentario
  showResponses(id) {
    this.authService.getResponses(id).subscribe(data => {
      this.respuestas = data.map(e => {
        return {
          id: e.payload.doc.id,
          comment_id: e.payload.doc.data()['Comentario'],
          response: e.payload.doc.data()['Respuesta'],
          responseUser: e.payload.doc.data()['ResponseUser'],
        };
      });
      console.log(this.respuestas);
      this.showed = true;
    });
  }

  // Añadir una respuesta a un comentario
  addResponse(id): void {
    if (this.authService.isLogged) {
      if (this.response != "") {
        let record = {};
        record['Comentario'] = id;
        record['Respuesta'] = this.response;
        record['ResponseUser'] = this.authService.currentUserName;
        console.log(record);

        this.authService.createResponse(record).then(resp => {
          this.response = '';
          console.log(resp);
        }).catch(error => console.log(error.message));
      }

    } else {
      this.presentToast();
    }
  }

  // Borra un comentario
  deleteComment(id) {
    if (this.authService.isLogged) {
      this.deleteCommentAlert(id);
    }
  }

  // Borra una respuesta de un comentario
  deleteResponse(id) {
    if (this.authService.isLogged) {
      this.deleteResponseAlert(id);
    }
  }

  async deleteCommentAlert(id) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Atención!',
      message: ' <strong>Estás seguro de que quieres eliminar el comentario?</strong>!!!',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Aceptar',
          handler: () => {
            this.authService.deleteComment(id);
            console.log('Confirm Okay');
          }
        }
      ]
    });

    await alert.present();
  }

  async deleteResponseAlert(id) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Atención!',
      message: ' <strong>Estás seguro de que quieres eliminar el comentario?</strong>!!!',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Aceptar',
          handler: () => {
            this.authService.deleteResponse(id);
            console.log('Confirm Okay');
          }
        }
      ]
    });

    await alert.present();
  }

}
