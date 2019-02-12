import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Categories } from './categories';

@NgModule({
  declarations: [
    Categories,
  ],
  imports: [
    IonicPageModule.forChild(Categories),
  ],
  exports: [
    Categories
  ]
})
export class CategoriesModule {}
