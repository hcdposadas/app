import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { App } from './app.global';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: string = 'MenuPage';

  constructor(platform: Platform, private statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      // set status bar to white
      // this.statusBar.backgroundColorByHexString('#ff8b21');
      this.statusBar.backgroundColorByHexString(App.StatusBarColor);
      //Status bar transparente
      //this.statusBar.overlaysWebView(true);
      splashScreen.hide();
    });
  }
}

