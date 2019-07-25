import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DetailPage } from './detail';
import { SafePipe } from './safe.pipe';
import { IonicHeaderParallaxModule } from 'ionic-header-parallax';

@NgModule({
  declarations: [
    DetailPage,
    SafePipe,
  ],
  
  imports: [
    IonicPageModule.forChild(DetailPage),
    IonicHeaderParallaxModule
  ],
  
  exports: [
    SafePipe
  ]
})
export class DetailPageModule {}
