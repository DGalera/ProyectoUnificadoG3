import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ColaborarPageRoutingModule } from './colaborar-routing.module';

import { ColaborarPage } from './colaborar.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ColaborarPageRoutingModule
  ],
  declarations: [ColaborarPage]
})
export class ColaborarPageModule {}
