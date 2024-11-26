import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router'; // Importar RouterModule si usas routerLink en el header
import { HeaderComponent } from './header.component'; // Asegúrate de que esta ruta sea correcta

@NgModule({
  declarations: [HeaderComponent], // Declara el HeaderComponent
  imports: [
    CommonModule,
    IonicModule,
    RouterModule, // Importa RouterModule si usas routerLink
  ],
  exports: [HeaderComponent], // Exporta el HeaderComponent para usarlo en otros módulos
})
export class HeaderModule {}
