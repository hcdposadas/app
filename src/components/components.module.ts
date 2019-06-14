import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular'
import { LazyLoader } from './lazy-loader';
@NgModule({
    declarations: [LazyLoader],
    imports: [IonicModule],
    exports: [LazyLoader]
})
export class ComponentsModule { }