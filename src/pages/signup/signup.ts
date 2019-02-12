import { Component } from '@angular/core';
import { IonicPage, NavController, AlertController, Loading, LoadingController} from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Auth } from '../../providers/auth';
import { EmailValidator } from '../../validators/email';
import { HomePage } from '../home/home';
/**
 * Generated class for the Signup page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
    selector: 'page-signup',
    templateUrl: 'signup.html',
})
export class signup {
    public signupForm: FormGroup;
    loading: Loading;
    constructor(public navCtrl: NavController, public authProvider: Auth,
        public formBuilder: FormBuilder, public loadingCtrl: LoadingController,
        public alertCtrl: AlertController) {

        this.signupForm = formBuilder.group({
            email: ['', Validators.compose([Validators.required, EmailValidator.isValid])],
            password: ['', Validators.compose([Validators.minLength(6), Validators.required])]
        });
    }

    signupUser() {
        if (!this.signupForm.valid) {
            console.log(this.signupForm.value);
        } else {
            this.authProvider.signupUser(this.signupForm.value.email, this.signupForm.value.password)
                .then(() => {
                    this.loading.dismiss().then(() => {
                        this.navCtrl.setRoot(HomePage);
                        console.log('login successful');
                    });
                }, (error) => {
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


}
