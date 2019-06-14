import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController, Loading } from 'ionic-angular';
import { WpProvider } from '../../providers/wp/wp';
import { Network } from '@ionic-native/network';

declare var moment: any;

@IonicPage()
@Component({
  selector: 'page-pages',
  templateUrl: 'pages.html',
})
export class PagesPage {

  items: any = [];
  response: any = [];
  loading: Loading;
  networkStatus: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public wp: WpProvider, private toastCtrl: ToastController, public loadingCtrl: LoadingController, private network: Network) {
  }

  ionViewDidLoad() {
    let type = this.network.type;
    this.networkStatus = type;
    if (type != 'none') {
      this.getPages();
    } else {
      this.presentToast('Internet connection offline');
    }   
  }

  getPages() {
    this.presentLoadingDefault();    
    this.wp.getPages().then(data => {
      this.loading.dismiss();
      this.response = data;
      this.items = this.response.pages;
    }).catch(err => {
      this.loading.dismiss();
      this.presentToast("Something went wrong!");
    });
  }

  getDate(date) {
    return moment(date).format('ll');
  }

  goToDetail(item) {
    this.navCtrl.push('DetailPage', {
      data: item
    })
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
