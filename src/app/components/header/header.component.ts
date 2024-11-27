import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent  implements OnInit {
  userName: string = '';
  userTag: string = '';
  userEmail: string = '';

  constructor(
    private menuCtrl: MenuController,
  ) {}

  ngOnInit() {}

  cerrarMenu() {
    this.menuCtrl.close();
  }
}
