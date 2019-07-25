import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { YoutubeVideoPlayer } from '@ionic-native/youtube-video-player';
import { MyApp } from './app.component';
import { PopoverContentComponent } from '../components/popover-content/popover-content';
import { HttpModule } from '@angular/http';
import { WpProvider } from '../providers/wp/wp';
import { Network } from '@ionic-native/network';
import { SocialSharing } from '@ionic-native/social-sharing';
import { OneSignal } from '@ionic-native/onesignal';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { VarGlobalProvider } from '../providers/var-global/var-global';

@NgModule({
  declarations: [
    MyApp,
    PopoverContentComponent
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    PopoverContentComponent,
  ],
  providers: [
    InAppBrowser,
    StatusBar,
    SplashScreen,
    YoutubeVideoPlayer,
    Network,
    SocialSharing,
    OneSignal,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    WpProvider,
    VarGlobalProvider
  ]
})
export class AppModule {}
