import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';


import { RouterModule } from '@angular/router'; // Importar RouterModule

@NgModule({
  declarations: [], // Declaramos el HeaderComponent
  imports: [CommonModule, IonicModule, RouterModule,],
  exports: [], // Lo exportamos para que esté disponible en otros módulos
})
export class SharedModule {}
