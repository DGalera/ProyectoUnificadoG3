import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { LoginPage } from '../login/login.page';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(public modalController: ModalController) { }

  ngOnInit() {
  }

  // Array de objetos del slider del inicio
  slides = [
    {
      titulo: 'Folding at home, <br> un proyecto de todos',
      desc: 'Descubre cómo participar en el proyecto',
      boton: 'Colaborar',
      navigate: '/colaborar'
    },
    {
      titulo: 'Consulta las estadísticas <br> de la aplicación',
      desc: 'Información sobre las contribuciones en <br> Folding at Home',
      boton: 'Estadísticas',
      navigate: '/estadisticas'
      
    },
    {
      titulo: 'Participa en <br> nuestro foro',
      desc: 'Comparte tus impresiones sobre <br> Folding at Home con los demás',
      boton: 'Foro',
      navigate: '/tablon-respuestas'
    }
  ];

  // Slider automático

  slideOptionsOne = {
    initialSlide: 0,
    slidesPerView: 1,
    autoplay: true,
    speed: 400
  }

  
  // Modal de registro

  async registerTapped(){

    let modal;
    modal = await this.modalController.create({
      component: LoginPage,
    });

    return await modal.present();
  }

}
