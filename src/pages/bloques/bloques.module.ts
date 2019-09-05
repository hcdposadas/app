import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BloquesPage } from './bloques';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    BloquesPage,
  ],
  imports: [
    IonicPageModule.forChild(BloquesPage),
    ComponentsModule
  ],
})
export class BloquesPageModule {}
