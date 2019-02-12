import { Injectable } from '@angular/core';
import firebase from 'firebase';
import {AngularFireDatabase} from 'angularfire2/database';
import {AddImageProvider} from './add-image/add-image';
import {item} from '../models/item/item.interface';
import { Camera } from '@ionic-native/camera';

@Injectable()
export class DataProvider {
    public items = firebase.database().ref(`/categories/products`);
    public userProfileRef: firebase.database.Reference;
    public categoryId;

    constructor(public af: AngularFireDatabase,
        public addImage: AddImageProvider,
        public camera: Camera,
    ) {
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                this.userProfileRef = firebase.database().ref(`userProfile/${user.uid}`);
            }
        });
    }

    viewAllProducts(): firebase.database.Reference {
        return firebase.database().ref('/items');
    }

    viewCategories(): firebase.database.Reference {
        return firebase.database().ref('/categoryList');
    }

	deleteCategory(categoryId:string):Promise<any>  {
		return firebase.database().ref(`/categories/${categoryId}`).remove();
	}
	
    viewItems(categoryId: string): firebase.database.Reference {
        return firebase.database().ref(`/categories/${categoryId}/products`);
    }

    addItem(item: item): Promise<any> {
        return new Promise((resolve) => {
            firebase.database().ref(`/categories/${item.type}/products`).push(item).then(() => {
                resolve(true);
            })
        })
    }

    async editItem(item: item, categoryId: string): Promise<any> {
        return this.af.object(`/categories/${categoryId}/products/${item.id}`).update({
            name: item.name,
            price: item.price,
            quantity: item.quantity,
			image:item.image
        });
    }

    removeItem(categoryId: string, item: item): Promise<any> {
        return this.af.object(`/categories/${categoryId}/products/${item.id}`).remove();
    }

     addOffer(item: item, categoryId: string) {
        return firebase.database().ref(`/categories/${categoryId}/products/${item.id}`).update({
            discount: item.discount,
            offerValidity: item.offerValidity
        });
    }

	addToOffers(item:item) {
		return firebase.database().ref('/offers').push(item);
	}
	
	viewOffers() {
		return firebase.database().ref('/offers');
	}
}

