import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  // Array de objetos del slider del inicio
  slides = [
    {
      titulo: 'Folding at home <br> Un proyecto de todos',
      desc: 'Resumen sobre lo que es el proyecto y lo que pretende <br> llegar a conseguir',
      boton: 'Saber más'
    },
    {
      titulo: 'Comienza a <br> colaborar',
      desc: 'Información relevante que incite a los lectores a <br> participar en el proyecto',
      boton: 'Colabora'
    },
    {
      titulo: 'COVID-19',
      desc: 'Información resumida sobre el covid-19 para aquellos <br> que estén interesados en saber más acerca de ello',
      boton: 'Saber más'
    }
  ];

  // Slider automático

  slideOptionsOne = {
    initialSlide: 0,
    slidesPerView: 1,
    autoplay: false,
    speed: 400
  }

}
