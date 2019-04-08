import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {AddItem} from'../add-item/add-item';
import firebase from 'firebase';
import{Auth} from '../../providers/auth';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
	public admin:string;
  constructor(public navCtrl: NavController, public auth:Auth) {
	  /*
this.auth.getUserinfo().then((user) => {
	alert(JSON.stringify(user));
	this.admin = user.admin;
});
*/
this.admin = firebase.auth().currentUser.email;
alert(JSON.stringify(this.admin));
  }
/*
  ionViewDidLoad() {
this.auth.getUserinfo().then((user) => {
	alert(JSON.stringify(user));
	this.admin = user.admin;
});
	
  }*/	
  addItem(): void {
      this.navCtrl.push('AddItem');
  }

  viewCategories() {
      this.navCtrl.push('Categories');
  }

  
  addOffer() {
      this.navCtrl.push('AddOfferPage');
  }

availableOffers() {
this.navCtrl.push('AvailableOffersPage');	
}

logout() {
this.auth.logoutUser();
this.navCtrl.setRoot('Login');
}	
}