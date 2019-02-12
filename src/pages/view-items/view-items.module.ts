import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ViewItems } from './view-items';

@NgModule({
  declarations: [
    ViewItems,
  ],
  imports: [
    IonicPageModule.forChild(ViewItems),
  ],
  exports: [
    ViewItems
  ]
})
export class ViewItemsModule {}
