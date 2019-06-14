import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController, Loading } from 'ionic-angular';
import { Network } from '@ionic-native/network';
import { YoutubeVideoPlayer } from '@ionic-native/youtube-video-player';


@IonicPage()
@Component({
  selector: 'page-vivo',
  templateUrl: 'vivo.html',
})
export class VivoPage {

  items: any = [];
  data: any;
  loading: Loading;
  networkStatus: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private toastCtrl: ToastController, public loadingCtrl: LoadingController, private network: Network, private youtube: YoutubeVideoPlayer) {
  }

  ionViewDidLoad() {
    let type = this.network.type;
    this.networkStatus = type;
    if (type != 'none') {
      this.openVideo();
    } else {
      this.presentToast('Internet connection offline');
    }   
  }

  openVideo(){
    this.youtube.openVideo('mX0Q2eTI250');
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
