import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { App } from './app.global';
import { WpProvider } from '../providers/wp/wp';
import { VarGlobalProvider } from '../providers/var-global/var-global';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: string = 'MenuPage';

  constructor(platform: Platform, private statusBar: StatusBar, splashScreen: SplashScreen, private wp: WpProvider, public GVP: VarGlobalProvider) {

    this.wp.getPosts(1).then(data => {      
      this.GVP.news = data['posts'];
      this.GVP.sendNews(this.GVP.news);
      console.log('dta',this.GVP.news);
      
    }).catch(err => {     
      this.GVP.presentToast("Something went wrong!");
    });

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

