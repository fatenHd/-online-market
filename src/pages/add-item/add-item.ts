import { IonicPage, NavController, NavParams, AlertController} from 'ionic-angular';
import { Component } from '@angular/core';
//import { Camera, CameraOptions} from '@ionic-native/camera';
import firebase from 'firebase';
import {DataProvider} from '../../providers/data';
import {AddImageProvider} from '../../providers/add-image/add-image';
import {item} from '../../models/item/item.interface';
@IonicPage({
    name: 'AddItem'
})
@Component({
    selector: 'page-add-item',
    templateUrl: 'add-item.html',
})
export class AddItem {
	public categories:Array<any> 
    public captureDataUrl: string ='';
    public base64Data: string;
    public item: item = <item>{}
    constructor(public navCtrl: NavController, public navParams: NavParams, 
                public dataProvider: DataProvider, public alertCtrl: AlertController,
                public imageProvider: AddImageProvider) {

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
			//this.loadedCategories=this.categories;
        });

    }

    addImage() {
        let alert = this.alertCtrl.create({
            title: ' add image ',
            buttons: [
                {
                    text: 'select existing image',
                    handler: data => {
                        this.imageProvider.selectPhoto().then((imageData) => {
                            if(imageData){
                                this.base64Data = imageData;
                                this.captureDataUrl = "data:image/jpeg;base64,"+imageData;
                            }else{

                            }
                        alert.dismiss();
                        return false;
                        })
                    }
                },
                {
                    text: 'take a  new image',
                    handler: data => {
                        this.imageProvider.capturePhoto().then((imageData) => {
                            if(imageData){
                                this.base64Data = imageData;
                                this.captureDataUrl = "data:image/jpeg;base64,"+imageData;
                            }else{

                            }
                        alert.dismiss();
                        return false;
                        })
                    }
                },
                {
                    text: 'Dont add image',
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

    addItem() {
        if (this.captureDataUrl != '') {
            let storageRef = firebase.storage().ref();
            const filename = this.item.name;
            const imageRef = storageRef.child(`images/${filename}.jpg`);
            imageRef.putString(this.base64Data, 'base64' ).then((url) => {
                this.item.image = url.downloadURL;
				
                this.dataProvider.addItem(this.item).then((response) => {
					alert(JSON.stringify(this.item));
                    this.navCtrl.pop();
                })
            });
        }
        else {
            this.dataProvider.addItem(this.item).then((response) => {
                this.navCtrl.pop();
            });
        }
    }

}
 