import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ContactoPage } from './contacto';
import { ComponentsModule } from '../../components/components.module';
import { EmailComposer } from '@ionic-native/email-composer';

@NgModule({
  declarations: [
    ContactoPage,
  ],
  imports: [
    IonicPageModule.forChild(ContactoPage),
    ComponentsModule
  ],
  providers: [
    EmailComposer
  ]
})
export class ContactoPageModule {}
