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
      titulo: 'Folding at home <br> Un proyecto de todos',
      desc: 'Resumen sobre lo que es el proyecto y lo que pretende <br> llegar a conseguir',
      boton: 'Estadísticas',
      navigate: '/estadisticas'
    },
    {
      titulo: 'Comienza a <br> colaborar',
      desc: 'Información relevante que incite a los lectores a <br> participar en el proyecto',
      boton: 'Colabora',
      navigate: '/colaborar'
    },
    {
      titulo: 'COVID-19',
      desc: 'Información resumida sobre el covid-19 para aquellos <br> que estén interesados en saber más acerca de ello',
      boton: 'Respuestas',
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
