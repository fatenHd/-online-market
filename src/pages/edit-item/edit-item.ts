import { Component } from '@angular/core';
import { IonicPage, NavController, AlertController,NavParams } from 'ionic-angular';
import firebase from 'firebase';
import {DataProvider} from '../../providers/data';
import {AddImageProvider} from '../../providers/add-image/add-image';
import {item} from '../../models/item/item.interface';

@IonicPage({
    name: 'editItem'
})
@Component({
    selector: 'page-edit-item',
    templateUrl: 'edit-item.html',
})
export class EditItemPage {
    public item: item;
    categoryId: string;
    public captureDataUrl:string ='';
	public base64Data:string;
	public image_content:string 
    constructor(
        public navCtrl: NavController,
		public alertCtrl:AlertController,
        public navParams: NavParams,
        public dataProvider: DataProvider,
		public addImageProvider:AddImageProvider
    ) {
        this.item = navParams.get('item');
        this.categoryId = navParams.get('categoryId');
    }

	addImage()  {
        let alert = this.alertCtrl.create({
            title: ' add image ',
            buttons: [
                {
                    text: 'select existing image',
                    handler: data => {
                        this.addImageProvider.selectPhoto().then((imageData) => {
                            if(imageData){
                                this.base64Data = imageData;
                                this.captureDataUrl = "data:image/jpeg;base64,"+imageData;
                            }else{

                            }
                        })
                        alert.dismiss();
                        return false;
                    }
                },
                {
                    text: 'take a  new image',
                    handler: data => {
                        this.addImageProvider.capturePhoto().then((imageData) => {
                            if(imageData){
                                this.base64Data = imageData;
                                this.captureDataUrl = "data:image/jpeg;base64,"+imageData;
                            }else{

                            }
                        })
                        alert.dismiss();
                        return false;
                    }
                },
                {
                    text: 'Dont add image',
                    role: 'cancel',
                    handler: () => {
						this.navCtrl.pop();
                        console.log('Cancel clicked');
                        alert.dismiss();
                        return false;
                    }
                }
            ]
        });
        alert.present();
    }

     updateItem() {
       if (this.captureDataUrl !='') {
		    let storageRef = firebase.storage().ref();
            const filename = this.item.name;
            const imageRef = storageRef.child(`images/${filename}.jpg`);
            imageRef.putString(this.base64Data, 'base64' ).then((url) => {
                this.item.image = url.downloadURL;
                let updateItem =  this.dataProvider.editItem(this.item, this.categoryId).then((response) => {
					alert(JSON.stringify(this.item));
                    this.navCtrl.pop();
                });
            });
        }
   else {
        let updateItem =  this.dataProvider.editItem(this.item, this.categoryId).then((response) => {
					alert(JSON.stringify(this.item));
                    this.navCtrl.pop();
                });
        }
        
    }

}
