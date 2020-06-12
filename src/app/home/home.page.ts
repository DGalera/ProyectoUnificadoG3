import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { LoginPage } from '../login/login.page';
import { url } from 'inspector';

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
      titulo: 'Folding at home <br> Un proyecto de todos',
      desc: 'Información sobre las contribuciones en <br> Folding at Home',
      boton: 'Estadísticas',
      navigate: '/estadisticas',
      foto: './../../assets/img/fotofolding.jpg'
    },
    {
      titulo: 'Comienza a <br> colaborar',
      desc: 'Descubre como participar en el proyecto',
      boton: 'Colabora',
      navigate: '/colaborar',
      foto:'./../../assets/img/folding-at-home.jpg'
    },
    {
      titulo: 'Visita nuestro FORO',
      desc: 'Y háznos una pregunta',
      boton: 'Respuestas',
      navigate: '/tablon-respuestas',
      foto: './../../assets/img/slide.jpg'
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
