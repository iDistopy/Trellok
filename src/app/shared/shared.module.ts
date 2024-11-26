import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { HeaderComponent } from '../header/header.component';


import { RouterModule } from '@angular/router'; // Importar RouterModule

@NgModule({
  declarations: [HeaderComponent], // Declaramos el HeaderComponent
  imports: [CommonModule, IonicModule, RouterModule,],
  exports: [HeaderComponent], // Lo exportamos para que esté disponible en otros módulos
})
export class SharedModule {}
