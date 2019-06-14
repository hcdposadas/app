import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SesionenvivoPage } from './sesionenvivo';
import { SafePipe } from './safe.pipe';

@NgModule({
  declarations: [
    SesionenvivoPage,
    SafePipe
  ],
  imports: [
    IonicPageModule.forChild(SesionenvivoPage),
  ],
  exports: [
    SafePipe
  ]
})
export class SesionenvivoPageModule {}
