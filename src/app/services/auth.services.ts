import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/compat/auth";

@Injectable({
    providedIn: 'root'
})

export class AuthService {
    constructor(private afAuth: AngularFireAuth) {}

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

    async register(email: string, password: string) {
        try {
            const newUser = await this.afAuth.createUserWithEmailAndPassword(email, password);
            console.log('Nuevo usuario: ', newUser);

            await newUser.user?.sendEmailVerification();
            console.log('Email de verificación enviado');
        } catch (error) {
            console.log('Error en el registro: ', error);
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