import { Injectable } from '@angular/core';
import { Camera, CameraOptions} from '@ionic-native/camera';

@Injectable()
export class AddImageProvider {
    constructor(public camera: Camera) {
    
  }
	
selectPhoto(): Promise<any>{
    return new Promise((resolve) => {
        const options: CameraOptions = {
            quality: 90,
            targetWidth: 300,
            targetHeight: 300,
            destinationType: this.camera.DestinationType.DATA_URL,
            sourceType: this.camera.PictureSourceType.SAVEDPHOTOALBUM,
            allowEdit: true
        }
        this.camera.getPicture(options).then((imageData) => {
            resolve(imageData)
        }).catch(() => resolve(false))
    })
    }

capturePhoto(): Promise<any>{
    return new Promise((resolve) => {
        const options: CameraOptions = {
            quality: 90,
            targetWidth: 300,
            targetHeight: 300,
            destinationType: this.camera.DestinationType.DATA_URL,
            sourceType: this.camera.PictureSourceType.CAMERA,
            allowEdit: true
        }
        this.camera.getPicture(options).then((imageData) => {
             resolve(imageData);
        }).catch(() => resolve(false));
    })
}    
	
}
