import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { DatePipe } from '@angular/common';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { FIREBASE_CREDENTIALS } from './firebase.credentials';
//import { AngularFireOfflineModule } from 'angularfire2-offline';
import firebase from 'firebase';
import { FCM } from '@ionic-native/fcm';
import {Camera} from '@ionic-native/camera';
import { AngularFireAuth } from 'angularfire2/auth';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { Auth} from '../providers/auth';
import {DataProvider} from '../providers/data';
import { AddImageProvider } from '../providers/add-image/add-image';
const firebaseConfig = {
    apiKey: "%API-KEY%",
    authDomain: "%AUTH-DOMAIN%",
    databaseURL: "%DATABASE-URL%",
    projectId: "%PROJECT-ID%",
    storageBucket: "%STORAGE-BUCKET%",
    messagingSenderId: "%MESSAGING-SENDER-ID%"
};


@NgModule({
    declarations: [
        MyApp,
        HomePage
        
    ],
    imports: [
        BrowserModule,
        IonicModule.forRoot(MyApp),
        FormsModule,
        HttpModule,
        AngularFireDatabaseModule,
        
        AngularFireModule.initializeApp(FIREBASE_CREDENTIALS),

    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        HomePage
    ],
    providers: [
        StatusBar,
        SplashScreen,
        Camera,
        { provide: ErrorHandler, useClass: IonicErrorHandler },
        Auth,
        DataProvider,
        FCM,
        AngularFireAuth,
        AddImageProvider, 
        DatePipe
    ]
})
export class AppModule { }
