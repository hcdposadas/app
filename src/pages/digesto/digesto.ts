import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController, Loading } from 'ionic-angular';
import { Network } from '@ionic-native/network';


@IonicPage()
@Component({
  selector: 'page-digesto',
  templateUrl: 'digesto.html',
})
export class DigestoPage {

  items: any = [];
  data: any;
  loading: Loading;
  networkStatus: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private toastCtrl: ToastController, public loadingCtrl: LoadingController, private network: Network) {
  }

  // ionViewDidLoad() {
    // let type = this.network.type;
    //this.networkStatus = type;
    //if (type != 'none') {
      //this.items();
    //} else {
      //this.presentToast('Internet connection offline');
    //}   
  //}

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
