import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { VivoPage } from './vivo';
import { SafePipe } from './safe.pipe';

@NgModule({
  declarations: [
    VivoPage,
    SafePipe
  ],
  imports: [
    IonicPageModule.forChild(VivoPage),
  ],
  exports: [
    SafePipe
  ]
})
export class VivoPageModule {}
