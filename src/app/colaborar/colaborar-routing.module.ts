import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ColaborarPage } from './colaborar.page';

const routes: Routes = [
  {
    path: '',
    component: ColaborarPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ColaborarPageRoutingModule {}
