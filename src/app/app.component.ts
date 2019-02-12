import { Component, ViewChild} from '@angular/core';
import {FCM} from '@ionic-native/fcm';
import { Platform, NavController} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HomePage } from '../pages/home/home';
import { AngularFireAuth } from 'angularfire2/auth';
import firebase from 'firebase';

@Component({
    templateUrl: 'app.html'
})
export class MyApp {
    //rootPage: any;
    @ViewChild('myNav') navCtrl: NavController;
    rootPage: any;
    constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, fcm: FCM, afAuth: AngularFireAuth) {
        const authUnsubscribe = afAuth.authState.subscribe(user => {
            if (user) {
                this.rootPage = HomePage;
            } else {
                this.rootPage = 'Login';
            }
        });

        platform.ready().then(() => {
            fcm.onNotification().subscribe(data => {
                if (data.wasTapped) {
                    authUnsubscribe.unsubscribe();
                    //Notification was received on device tray and tapped by the user.
                    console.log(JSON.stringify(data));
                    this.navCtrl.setRoot('ItemDetailsPage', {
                        itemId: data.item.id
                    });
                } else {
                    //Notification was received in foreground. Maybe the user needs to be notified.
                    console.log(JSON.stringify(data));
                    this.navCtrl.push('ItemDetailsPage', {
                        itemId: data.item.id
                    });
                }
            });
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            statusBar.styleDefault();
            splashScreen.hide();
        });
    }
}


        