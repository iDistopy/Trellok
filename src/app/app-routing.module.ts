import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';
import { guestGuard } from './guards/guest.guard';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule),
    canActivate: [authGuard]
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'unirse',
    loadChildren: () => import('./join/main/main.module').then( m => m.MainPageModule),
    canActivate: [guestGuard]
  },
  {
    path: 'register',
    loadChildren: () => import('./join/register/register.module').then( m => m.RegisterPageModule),
    canActivate: [guestGuard]
  },
  {
    path: 'login',
    loadChildren: () => import('./join/login/login.module').then( m => m.LoginPageModule),
    canActivate: [guestGuard]
  },
  {
    path: 'settings', 
    loadChildren: () => import('./settings/settings.module').then(m => m.SettingsModule)
  }
      
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
