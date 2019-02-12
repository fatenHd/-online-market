import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, AlertController} from 'ionic-angular';
import {DataProvider} from '../../providers/data';

@IonicPage({
    name: 'Categories'
})
@Component({
    selector: 'page-catigories',
    templateUrl: 'categories.html',
})
export class Categories {
    public categories: Array <any>;
public loadedCategories: Array <any> 
public searchTerm:string ='';
    constructor(public navCtrl: NavController, public navParams: NavParams, public dataProvider: DataProvider, public alertCtrl:AlertController) {
     this.loadedCategories =[];
    }
    ionViewDidEnter() {
        this.dataProvider.viewCategories().on('value', snapshot => {
            this.categories = [];
            snapshot.forEach(snap => {
                this.categories.push({
                    id: snap.key,
                    name: snap.val().name
                });
				//alert(JSON.stringify(this.categories));
                return false
            });
			this.loadedCategories=this.categories;
        });

    }

initializeCategories(): void {
        this.categories = this.loadedCategories;
    }

    getCategories() {
        this.initializeCategories();
        if (this.searchTerm && this.searchTerm.trim() != '') {
        this.categories = this.categories.filter((v) => {
            return v.name.toLowerCase().indexOf(this.searchTerm.toLowerCase()) == 0                 
        });
    }
        console.log(this.categories);
        
    } 
    
    moreOptions(categoryId:string ) {
         let alert = this.alertCtrl.create({		
		             title: 'what do you want to do?',
            buttons: [
			{
				                    text: 'set offer on this category',
									                    handler: data => {
															this.setOffer(categoryId);
															                        alert.dismiss();
																					                        return false;
														}
			},
			{
				text:'delete this category',
				handler: data => {
			this.dataProvider.deleteCategory(categoryId );
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
	}
	
	setOffer(categoryId:string) {
		this.navCtrl.push('AddOfferPage', {'categoryId': categoryId});
	}
	
    viewItems(categoryId:string )  {
        this.navCtrl.push('items', {'categoryId': categoryId });
    }
	
}
