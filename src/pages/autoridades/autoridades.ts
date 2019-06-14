import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController, Loading } from 'ionic-angular';
import { WpProvider } from '../../providers/wp/wp';
import { Network } from '@ionic-native/network';


@IonicPage()
@Component({
  selector: 'page-autoridades',
  templateUrl: 'autoridades.html',
})
export class AutoridadesPage {

  items: any = [];
  data: any;
  loading: Loading;
  networkStatus: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public wp: WpProvider, private toastCtrl: ToastController, public loadingCtrl: LoadingController, private network: Network) {
  }

  ionViewDidLoad() {
    let type = this.network.type;
    this.networkStatus = type;
    if (type != 'none') {
      this.getPageAutoridades();
    } else {
      this.presentToast('Internet connection offline');
    }   
  }

  getPageAutoridades() {
    this.presentLoadingDefault();    
    this.wp.getPageAutoridades().then(data => {
      this.loading.dismiss();
      this.data = data;
    }).catch(err => {
      this.loading.dismiss();
      this.presentToast("Algo salió mal!");
    });
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
