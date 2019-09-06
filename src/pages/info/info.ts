import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController, Loading } from 'ionic-angular';
import { Network } from '@ionic-native/network';
import { InAppBrowserOptions } from '@ionic-native/in-app-browser';

@IonicPage()
@Component({
  selector: 'page-info',
  templateUrl: 'info.html'
})
export class InfoPage {
  loading: Loading;
  networkStatus: any;
  items: any = [];
  data: any = [];
  response: any = [];

  options : InAppBrowserOptions = {
    location : 'yes',//Or 'no' 
    hidden : 'no', //Or  'yes'
    clearcache : 'yes',
    clearsessioncache : 'yes',
    zoom : 'yes',//Android only ,shows browser zoom controls 
    hardwareback : 'yes',
    mediaPlaybackRequiresUserAction : 'no',
    shouldPauseOnSuspend : 'no', //Android only 
    closebuttoncaption : 'Close', //iOS only
    disallowoverscroll : 'no', //iOS only 
    toolbar : 'yes', //iOS only 
    enableViewportScale : 'no', //iOS only 
    allowInlineMediaPlayback : 'no',//iOS only 
    presentationstyle : 'pagesheet',//iOS only 
    fullscreen : 'yes',//Windows only    
};

  constructor(public navCtrl: NavController, 
              public navParams: NavParams, 
              private toastCtrl: ToastController, 
              public loadingCtrl: LoadingController, 
              private network: Network) {
}

  ionViewDidLoad() {
    let type = this.network.type;
    this.networkStatus = type;
    if (type != 'none') {
    } else {
      this.presentToast('Internet connection offline');
    }
  }

  presentLoadingDefault() {
    this.loading = this.loadingCtrl.create({
      spinner: 'dots',
      content: 'Por favor, espere...',
      dismissOnPageChange: true
    });

    this.loading.present();
  }

  presentToast(text) {
    let toast = this.toastCtrl.create({
      message: text,
      duration: 3000,
      position: 'bottom',
    });
    toast.present();
  }

}
