import { Component } from '@angular/core';
import { IonicPage, NavController, AlertController, Loading, LoadingController} from 'ionic-angular';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { EmailValidator } from '../../validators/email';
import {Auth} from '../../providers/auth';
import {HomePage} from '../home/home';
@IonicPage()
@Component({
    selector: 'page-login',
    templateUrl: 'login.html',
})
export class Login {
    public loginForm: FormGroup;
    loading: Loading;

    constructor(public navCtrl: NavController, public loadingCtrl: LoadingController,
        public alertCtrl: AlertController, public authProvider: Auth,
        public formBuilder: FormBuilder) {

        this.loginForm = formBuilder.group({
            email: ['', Validators.compose([Validators.required, EmailValidator.isValid])],
            password: ['', Validators.compose([Validators.minLength(6), Validators.required])]
        });
    }


    ionViewDidLoad() {

    }

    loginUser(): void {
        if (!this.loginForm.valid) {
            console.log(this.loginForm.value);
        } else {
            this.authProvider.loginUser(this.loginForm.value.email, this.loginForm.value.password)
                .then(authData => {
                    this.loading.dismiss().then(() => {
                        this.navCtrl.setRoot(HomePage);
                        
                        console.log('login successful');
                    });
                }, error => {
                    this.loading.dismiss().then(() => {
                        let alert = this.alertCtrl.create({
                            message: error.message,
                            buttons: [
                                {
                                    text: "Ok",
                                    role: 'cancel'
                                }
                            ]
                        });
                        alert.present();
                    });
                });

            this.loading = this.loadingCtrl.create();
            this.loading.present();
        }
    }

    goToSignup(): void {
        this.navCtrl.push('signup');
    }

    goToResetPassword(): void {
        this.navCtrl.push('ResetPassword');
    }



}