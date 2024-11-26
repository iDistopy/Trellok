import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Timestamp } from 'firebase/firestore';

import * as bcrypt from 'bcryptjs'

@Injectable({
    providedIn: 'root'
})

export class AuthService {
    constructor(
        private afAuth : AngularFireAuth,
        private firestore : AngularFirestore 
    ) {}

    // Registro
    async register(email: string, password: string) {
        try {
            const newUser = await this.afAuth.createUserWithEmailAndPassword(email, password);
            console.log('Nuevo usuario: ', newUser);

            const user = await this.afAuth.currentUser;

            if (user) {
                const username = email.split('@')[0];
                const userTag = `@${username.toLowerCase()}`;
                const passwordHashed = bcrypt.hashSync(password, 15)

                const userData = {
                    'user_name': username,
                    'user_tag': userTag,
                    'user_email': email,
                    'created_date': Timestamp.now(),
                    'password': passwordHashed,
                    'profile_pic': 'https://firebasestorage.googleapis.com/v0/b/ionic-chat-7b7b4.appspot.com/o/default%2Fdefault-profile-pic.png?alt=media&token=3b3b3b3b-3b3b-3b3b-3b3b3b3b3b3b',
                };
            
                // Guardar en Firestore
                await this.firestore.collection('users').doc(user.uid).set(userData);
            } else {
                console.error('No se pudo obtener el usuario después de la autenticación');
                throw new Error('No se pudo obtener el usuario');
            }


            await newUser.user?.sendEmailVerification();
            console.log('Email de verificación enviado');
        } catch (error) {
            console.log('Error en el registro: ', error);
            throw error;
        }
    }

    // Inicio de sesión
    async login(email: string, password: string) { 
        try {
            const userCredentials = await this.afAuth.signInWithEmailAndPassword(email, password);
            const isVerified = await this.isEmailVerified();

            console.log('Usuario logueado: ', userCredentials);
        
            if (!isVerified) {
                console.warn('Email no verificado');
                alert('¡Tu correo electrónico no está verificado!')
                await this.logout();
                throw new Error('Email no verificado');
            }

            console.log('Inicio de sesión exitoso');
        
        } catch (error) {
            console.log('Error on login: ', error);
            throw error;
        }
    }

    async logout() {
        this.afAuth.signOut();
    }

    async isEmailVerified(): Promise<boolean> {
        const user = await this.afAuth.currentUser;
        return user ? user.emailVerified : false;
    }

    getUser() {
        this.afAuth.authState.subscribe(user => {
            return user;
        });
    }
}