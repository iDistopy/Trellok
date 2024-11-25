import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  userName: string = '';
  userTag: string = '';
  userEmail: string = '';

  constructor(
    private menuCtrl: MenuController,
    private afAuth: AngularFireAuth,
    private router: Router
  ) {}

  ngOnInit() {}

  async logout() {
    try {
      await this.afAuth.signOut();
      console.log('Sesión cerrada');
      this.router.navigate(['/login']);
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  }

  cerrarMenu() {
    this.menuCtrl.close();
  }
}