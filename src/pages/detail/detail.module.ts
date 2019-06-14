import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DetailPage } from './detail';
import { SafePipe } from './safe.pipe';
import { IonHeaderScrollOpacityModule } from 'ion-header-scroll-opacity';

@NgModule({
  declarations: [
    DetailPage,
	  SafePipe
  ],
  
  imports: [
    IonicPageModule.forChild(DetailPage),
    IonHeaderScrollOpacityModule
  ],
  
  exports: [
    SafePipe
  ]
})
export class DetailPageModule {}
