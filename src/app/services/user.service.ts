import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private afAuth: AngularFireAuth,
    private firestore: AngularFirestore
  ) { }

  async getUserData() {
    const user = await this.afAuth.currentUser;
    console.log('Usuario actual:', user);

    if (user) {
        const doc = await this.firestore.collection('users').doc(user.uid).get().toPromise();
        console.log('Datos del documento Firestore:', doc?.data());
        return doc?.data();
    }

    console.warn('No se pudo obtener el usuario logueado');
    return null;
  }
}
