import { Component, ViewChild} from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController} from 'ionic-angular';
import {DataProvider} from '../../providers/data';
/**
 * Generated class for the ItemsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
    name: 'items'
})
@Component({
    selector: 'page-items',
    templateUrl: 'items.html',
})
export class Items {
    
    public items: Array<any>;
	public loadedItems:Array <any>;
    public categoryId: any;
    public searchTerm:string = '';
        
    constructor(public navCtrl: NavController, public navParams: NavParams, public dataProvider: DataProvider, public alertCtrl:AlertController) {
		this.loadedItems=[];
        this.categoryId = this.navParams.get('categoryId');
    }
    ionViewDidEnter() {
          this.dataProvider.viewItems(this.navParams.get('categoryId')).on('value', snapshot => {
            this.items = [];
            snapshot.forEach(snap => {
                this.items.push({
                    id: snap.key,
                    name: snap.val().name,
                    price: snap.val().price,
                    quantity: snap.val().quantity,
                    discount: snap.val().discount,
                    validity: snap.val().offerValidity,
                    image: snap.val().image
                });
                return false;
            });
			
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
    
    viewDetails(item) {
        this.navCtrl.push('ItemDetailsPage', { item: item } );
    }
    
    goToEdit(item) {
        console.log(item);
        this.navCtrl.push('editItem', { 'item': item, 'categoryId': this.categoryId });
    }

    addOffer(item) {
        this.navCtrl.push('AddOfferPage', {  item: item, 'categoryId': this.categoryId });
  //      alert(JSON.stringify(this.item));
    }

    moreOptions(item) {
         let alert = this.alertCtrl.create({
            title: 'choose an action',
            buttons: [
                {
                    text: 'Edit',
                    handler: data => {
                        this.goToEdit(item);
                        alert.dismiss();
                        return false;
                    }
                },
                {
                    text: 'delete',
                    handler: data => {
                        this.dataProvider.removeItem(this.categoryId, item);
                        alert.dismiss();
                        return false;
                    }
                },
                {
                    text: 'Add offer',
                    handler: data => {
                        this.addOffer(item);
                        alert.dismiss();
                        return false;
                    }
                },
                {
                    text: 'Cancel',
                    role: 'cancel',
                    handler: () => {
                        console.log('Cancel clicked');
                        alert.dismiss();
                        return false;
                    }
                }
            ]
        });
        alert.present();
        //return false;
    }


}
