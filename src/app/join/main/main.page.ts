import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit {
  public isActionSheetHidden: boolean = true;
  public isLogin: boolean = false;
  public actionSheetAnimation: string = '';
  public overlayVisible: boolean = false;

  constructor(private router: Router) {}

  ngOnInit() {}

  toggleActionSheet(isLogin: boolean): void {
    this.isLogin = isLogin;
    this.isActionSheetHidden = false;
    this.overlayVisible = true;
    this.actionSheetAnimation = 'slide-in';
  }

  closeActionSheet(): void {
    this.actionSheetAnimation = 'slide-out';
    this.overlayVisible = false;
    setTimeout(() => {
      this.isActionSheetHidden = true;
    }, 500);
  }

  selectOption(value: number, text: string): void {
    this.closeActionSheet();
    console.log(`Opción seleccionada: ${text} (Valor: ${value})`);
  }

  async openRegister() {
    this.router.navigate(['/register']);
  }

  async openLogin() {
    this.router.navigate(['/login']);
  }
}