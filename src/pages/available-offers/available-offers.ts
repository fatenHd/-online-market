import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {DataProvider} from '../../providers/data';
@IonicPage()
@Component({
  selector: 'page-available-offers',
  templateUrl: 'available-offers.html',
})
export class AvailableOffersPage {
public offers:Array <any>;
  constructor(public navCtrl: NavController, public navParams: NavParams, public dataProvider:DataProvider) {
  }

  ionViewDidEnter() {
        this.dataProvider.viewOffers().on('value', snapshot => {
            this.offers = [];
            snapshot.forEach(snap => {
                this.offers.push({
                    id: snap.key,
                    name: snap.val().name,
					type: snap.val().type,
					price:snap.val().price,
					quantity: snap.val().quantity,
					discount: snap.val().discount,
					offerValidity: snap.val().offerValidity,
					image:snap.val().image
                });
                return false
            });
        });

    }

	viewOfferDetails(item) { 
	this.navCtrl.push('ItemDetailsPage', { item: item } );
	}
}
