import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OfferDetailsPage } from './offer-details';

@NgModule({
  declarations: [
    OfferDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(OfferDetailsPage),
  ],
})
export class OfferDetailsPageModule {}
