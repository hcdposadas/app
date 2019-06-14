import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DigestoPage } from './digesto';
import { SafePipe } from './safe.pipe';

@NgModule({
  declarations: [
    DigestoPage,
    SafePipe
  ],
  imports: [
    IonicPageModule.forChild(DigestoPage),
  ],
  exports: [
    SafePipe
  ]
})
export class DigestoPageModule {}
