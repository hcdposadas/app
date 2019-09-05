import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DetalleOrdenanzasPage } from './detalle-ordenanzas';
import { SafePipe } from './safe.pipe';

@NgModule({
  declarations: [
    DetalleOrdenanzasPage,
    SafePipe,
  ],
  
  imports: [
    IonicPageModule.forChild(DetalleOrdenanzasPage)
  ],
  
  exports: [
    SafePipe
  ]
})
export class DetalleOrdenanzasPageModule {}
