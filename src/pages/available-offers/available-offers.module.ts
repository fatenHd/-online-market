import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AvailableOffersPage } from './available-offers';

@NgModule({
  declarations: [
    AvailableOffersPage,
  ],
  imports: [
    IonicPageModule.forChild(AvailableOffersPage),
  ],
})
export class AvailableOffersPageModule {}
