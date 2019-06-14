import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ConcejalesPage } from './concejales';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    ConcejalesPage,
  ],
  imports: [
    IonicPageModule.forChild(ConcejalesPage),
    ComponentsModule
  ],
})
export class ConcejalesPageModule {}
