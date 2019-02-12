import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {DataProvider} from '../../providers/data';
import {item} from '../../models/item/item.interface';
import firebase from 'firebase/app';
import {AngularFireDatabase} from 'angularfire2/database';
@IonicPage()
@Component({
  selector: 'page-add-offer',
  templateUrl: 'add-offer.html',
})
export class AddOfferPage {
    public item: item;
	public loadedItems:Array <any>;
    public categoryId: string;
	public searchTerm:String ='';
	public discount:number;
	public offerValidity:string;
	//public checked:Boolean=false;
	public items:Array<any>; 
    public categories:Array<any>; 
    constructor(public navCtrl: NavController, public navParams: NavParams, public dataProvider: DataProvider, public afd:AngularFireDatabase) {
 //this.loadedCategories       =[];
 this.loadedItems=[];
	}
	
	ionViewDidEnter() {
this.dataProvider.viewCategories().on('value', snapshot => {
            this.categories = [];
            snapshot.forEach(snap => {
                this.categories.push({
                    id: snap.key,
                    name: snap.val().name
                });
                return false
            });
			//this.loadedCategories=this.categories;
        });

    }
	
viewItems(categoryId:string) {
    console.log(this.categoryId);
		 this.dataProvider.viewItems(this.categoryId).on('value', snapshot => {
             this.items = [];
             snapshot.forEach(snap => {
                 this.items.push({
                     id: snap.key,
                     name: snap.val().name,
                     price: snap.val().price,
                     quantity: snap.val().quantity,
                     discount: snap.val().discount,
                     offerValidity: snap.val().offerValidity,
                     image: snap.val().image,
					  checked:false
                 });
				 return false;
				 
             });
//alert(JSON.stringify(this.items));			
			this.loadedItems =this.items;
         });
    
	}

initializeItems(): void {
        this.items = this.loadedItems;
    }

getItems() {
        this.initializeItems();
        if (this.searchTerm && this.searchTerm.trim() != '') {
        this.items = this.items.filter((v) => {
            return v.name.toLowerCase().indexOf(this.searchTerm.toLowerCase()) == 0                 
        });
    }
        console.log(this.items);
        
    } 
    	
	setOffer() {
		this.items.forEach((item) => { 
		if (item.checked == true ) {
			item['discount']=this.discount; 
			item['offerValidity']= this.offerValidity;
	this.dataProvider.addOffer(item,this.categoryId).then ((response) => {
		alert (JSON.stringify(item));
		this.dataProvider.addToOffers(item);
		this.navCtrl.pop();
	});
	}
	});
	}
  
}
