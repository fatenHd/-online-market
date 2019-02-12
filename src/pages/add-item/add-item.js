"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var ionic_angular_1 = require("ionic-angular");
var core_1 = require("@angular/core");
var firebase_1 = require("firebase");
var AddItem = /** @class */ (function () {
    function AddItem(navCtrl, navParams, dataProvider, alertCtrl, imageProvider, camera) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.dataProvider = dataProvider;
        this.alertCtrl = alertCtrl;
        this.imageProvider = imageProvider;
        this.camera = camera;
        this.item = {};
    }
    AddItem.prototype.selectPhoto = function () {
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
            _this.base64Data = imageData;
        });
    };
    AddItem.prototype.capturePhoto = function () {
        var _this = this;
        var cameraOptions = {
            quality: 50,
            destinationType: this.camera.DestinationType.DATA_URL,
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.MediaType.PICTURE
        };
        this.camera.getPicture(cameraOptions).then(function (imageData) {
            _this.captureDataUrl = 'data:image/jpeg;base64,' + imageData;
            _this.base64Data = imageData;
        });
    };
    AddItem.prototype.addImage = function () {
        var _this = this;
        var alert = this.alertCtrl.create({
            title: ' add image ',
            buttons: [
                {
                    text: 'select existing image',
                    handler: function (data) {
                        _this.selectPhoto();
                        alert.dismiss();
                        return false;
                    }
                },
                {
                    text: 'take a  new image',
                    handler: function (data) {
                        _this.capturePhoto();
                        alert.dismiss();
                        return false;
                    }
                },
                {
                    text: 'Dont add image',
                    role: 'cancel',
                    handler: function () {
                        console.log('Cancel clicked');
                        alert.dismiss();
                        return false;
                    }
                }
            ]
        });
        alert.present();
    };
    AddItem.prototype.addItem = function () {
        var _this = this;
        if (this.captureDataUrl != '') {
            var storageRef = firebase_1["default"].storage().ref();
            var filename = Math.floor(Date.now() / 1000);
            var imageRef = storageRef.child("images/" + filename + ".jpg");
            imageRef.putString(this.base64Data, 'base64', { contentType: 'image/jpg' }).then(function (url) {
                _this.item.image = url.downloadURL;
                alert(JSON.stringify(_this.item.image));
                _this.dataProvider.addItem(_this.item).then(function (response) {
                    _this.navCtrl.pop();
                });
            });
        }
        else {
            this.dataProvider.addItem(this.item).then(function (response) {
                _this.navCtrl.pop();
            });
        }
    };
    AddItem = __decorate([
        ionic_angular_1.IonicPage({
            name: 'AddItem'
        }),
        core_1.Component({
            selector: 'page-add-item',
            templateUrl: 'add-item.html'
        })
    ], AddItem);
    return AddItem;
}());
exports.AddItem = AddItem;
