import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddOfferPage } from './add-offer';

@NgModule({
  declarations: [
    AddOfferPage,
  ],
  imports: [
    IonicPageModule.forChild(AddOfferPage),
  ],
})
export class AddOfferPageModule {}
