import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DatePipe } from '@angular/common';
import {item} from '../../models/item/item.interface';
/**
 * Generated class for the ItemDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()

@Component({
        selector: 'page-item-details',
        templateUrl: 'item-details.html',
})
export class ItemDetailsPage {
    public item: item;
    public validity: string;
    constructor(public navCtrl: NavController, public navParams: NavParams, public datePipe:DatePipe) {
        this.item = this.navParams.get('item');
        alert(JSON.stringify(this.item));        
  }

    //async viewDetails() {
    //}
}
  
