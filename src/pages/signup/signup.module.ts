import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { signup } from './signup';

@NgModule({
  declarations: [
    signup,
  ],
  imports: [
    IonicPageModule.forChild(signup),
  ],
  exports: [
    signup
  ]
})
export class signupModule {}
