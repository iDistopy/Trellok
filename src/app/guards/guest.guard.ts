import { inject } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { CanActivateFn, Router } from '@angular/router';
import { map } from 'rxjs/operators';

export const guestGuard: CanActivateFn = (route, state) => {
  const afAuth = inject(AngularFireAuth);
  const router = inject(Router); 

  return afAuth.authState.pipe(
    map((user) => {
      if (user) {
        console.log('Usuario autenticado, redirigiendo a /home');
        router.navigate(['/home']); 
        return false;
      }

      return true;
    })
  );
};
