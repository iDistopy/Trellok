import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';
import { HeaderModule } from '../header/header.module'; // Importa el HeaderModule


import { HomePageRoutingModule } from './home-routing.module';

import { SharedModule } from '../shared/shared.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    SharedModule,
    HeaderModule,
  ],
  declarations: [HomePage]
})
export class HomePageModule {}
