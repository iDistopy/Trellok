import { inject } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { CanActivateFn, Router } from '@angular/router';
import { map } from 'rxjs/operators';

export const authGuard: CanActivateFn = (route, state) => {
  const afAuth = inject(AngularFireAuth);
  const router = inject(Router);

  return afAuth.authState.pipe(
    map((user) => {
      if (!user) {
        console.log('Usuario no autenticado, rediriguiendo a /login');
        router.navigate(['/unirse']);
        return false;
      }

      return true;
    })
  );  
};
