"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var core_1 = require("@angular/core");
var AddImageProvider = /** @class */ (function () {
    function AddImageProvider(af, camera) {
        this.af = af;
        this.camera = camera;
    }
    AddImageProvider.prototype.selectPhoto = function () {
        var _this = this;
        var options = {
            quality: 90,
            targetWidth: 300,
            targetHeight: 300,
            destinationType: this.camera.DestinationType.DATA_URL,
            sourceType: 2,
            allowEdit: true
        };
        this.camera.getPicture(options).then(function (imageData) {
            _this.captureDataUrl = 'data:image/jpeg;base64,' + imageData;
        });
    };
    /*
            const filename = Math.floor(Date.now() / 1000);
            const itemImageRef = firebase.storage().ref(`/images/${filename}.png`);
            itemImageRef.putString(this.captureDataUrl, 'base64', { contentType: 'image/png' }).then(savedImage => {
                itemImage = itemImageRef.getDownloadURL();
            });
        });
        }
    */
    AddImageProvider.prototype.takePhoto = function () {
        /*
        const options: CameraOptions = {
            quality: 90,
            targetWidth: 300,
            targetHeight: 300,
            destinationType: this.camera.DestinationType.DATA_URL,
            sourceType: 1,
            encodingType: this.camera.EncodingType.PNG,
            allowEdit: true,
            saveToPhotoAlbum: true
        }

        this.camera.getPicture(options).then((itemImage) => {
            const itemImageRef = firebase.storage().ref('/images/itemImage.png');
            itemImageRef.putString(itemImage, 'base64', { contentType: 'image/png' }).then(savedImage => {
                firebase.database().ref(`/categories/${item.type}/products/${item.id}`).update({
                    itemImage: 'savedImage.downloadURL'
                });
            }); //(error) => {
            //console.log("ERROR -> " + JSON.stringify(error));
            //this.cameraImage = 'data:image/png;base64,' + imageData;
        });
        */
    };
    AddImageProvider = __decorate([
        core_1.Injectable()
    ], AddImageProvider);
    return AddImageProvider;
}());
exports.AddImageProvider = AddImageProvider;
