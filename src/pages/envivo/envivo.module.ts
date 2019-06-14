import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EnvivoPage } from './envivo';
import { SafePipe } from './safe.pipe';

@NgModule({
  declarations: [
    EnvivoPage,
    SafePipe
  ],
  imports: [
    IonicPageModule.forChild(EnvivoPage),
  ],
  exports: [
    SafePipe
  ]
})
export class EnvivoPageModule {}
