import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OrdenanzasPage } from './ordenanzas';
import { ComponentsModule } from '../../components/components.module';
import { IonicSelectableModule } from 'ionic-selectable';

@NgModule({
  declarations: [
    OrdenanzasPage,
  ],
  imports: [
    IonicPageModule.forChild(OrdenanzasPage),
    IonicSelectableModule,
    ComponentsModule
  ],
})
export class OrdenanzasPageModule {}
