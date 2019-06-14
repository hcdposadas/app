import { App } from './app.global';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { AppModule } from './app.module';
if (App.ProductionMode===1) {
    enableProdMode();
    console.log = function () { };
}
platformBrowserDynamic().bootstrapModule(AppModule);
