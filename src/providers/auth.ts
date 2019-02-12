import { Injectable } from '@angular/core';
import {FCM} from '@ionic-native/fcm';
import 'rxjs/add/operator/map';
import firebase from 'firebase';

/*
  Generated class for the Auth provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class Auth {
    public fireAuth: firebase.auth.Auth;
    public userProfileRef: firebase.database.Reference;

    constructor(public fcm:FCM) {
        this.fireAuth = firebase.auth();
        this.userProfileRef = firebase.database().ref('/userProfile');
    }

    loginUser(email: string, password: string): Promise<any> {
        return this.fireAuth.signInWithEmailAndPassword(email, password);
    }

    signupUser(email: string, password: string): Promise<any> {
        return this.fireAuth.createUserWithEmailAndPassword(email, password).then(newUser => {
            this.fcm.getToken().then(token => {
                this.userProfileRef.child(newUser.uid).set({
                    admin: true,
                    email: email,
                    token: token
                });
            });
        });
    }

    resetPassword(email: string): Promise<void> {
        return this.fireAuth.sendPasswordResetEmail(email);
    }

    logoutUser(): Promise<void> {
        this.userProfileRef.child(this.fireAuth.currentUser.uid).off();
        return this.fireAuth.signOut();
    }

}