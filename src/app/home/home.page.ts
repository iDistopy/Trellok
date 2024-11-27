import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  userData: any;

  constructor(
    private menuCtrl: MenuController,
    private afAuth: AngularFireAuth,
    private router: Router,
    private userService: UserService,
  ) {}

  async ngOnInit() {
    this.userData = await this.userService.getUserData();
    console.log('userData:', this.userData);
  }

  async logout() {
    try {
      await this.afAuth.signOut();
      console.log('Sesión cerrada');
      this.router.navigate(['/login']);
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  }

}