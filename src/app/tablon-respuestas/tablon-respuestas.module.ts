import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TablonRespuestasPageRoutingModule } from './tablon-respuestas-routing.module';

import { TablonRespuestasPage } from './tablon-respuestas.page';
import { ComentariosPage } from '../comentarios/comentarios.page';
import { FooterPage } from '../footer/footer.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TablonRespuestasPageRoutingModule
  ],
  declarations: [TablonRespuestasPage, ComentariosPage, FooterPage]
})
export class TablonRespuestasPageModule {}
