import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AutoridadesPage } from './autoridades';
import { SafePipe } from './safe.pipe';

@NgModule({
  declarations: [
    AutoridadesPage,
    SafePipe
  ],
  imports: [
    IonicPageModule.forChild(AutoridadesPage),
  ],
  exports: [
    SafePipe
  ]
})
export class AutoridadesPageModule {}
