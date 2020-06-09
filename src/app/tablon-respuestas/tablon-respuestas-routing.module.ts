import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TablonRespuestasPage } from './tablon-respuestas.page';

const routes: Routes = [
  {
    path: '',
    component: TablonRespuestasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TablonRespuestasPageRoutingModule {}
