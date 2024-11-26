import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule, Routes } from '@angular/router';
import { SettingsComponent } from './settings.component';
import { FormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module'; // Importa el SharedModule



const routes: Routes = [
  { path: '', component: SettingsComponent } // Ruta base del módulo
];

@NgModule({
  declarations: [SettingsComponent,],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    RouterModule.forChild(routes), // Configuración de rutas específicas para este módulo
  ],
})
export class SettingsModule {}
