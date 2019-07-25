import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController, Loading } from 'ionic-angular';
import { WpProvider } from '../../providers/wp/wp';
import { Network } from '@ionic-native/network';

// declare var moment: any;
/**
 * Generated class for the CategoryPostsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'concejales-posts',
  templateUrl: 'concejales.html',
})
export class ConcejalesPage {

  items: any = [];
  data: any = [];
  response: any = [];
  response2: any = [];
  prevData: any;
  offset = 1;
  loading: Loading;
  networkStatus: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public wp: WpProvider, private toastCtrl: ToastController, public loadingCtrl: LoadingController, private network: Network) {
    this.prevData = this.navParams.get('data');
  }

  ionViewDidLoad() {
    let type = this.network.type;
    this.networkStatus = type;
    if (type != 'none') {
      this.getConcejales();
    } else {
      this.presentToast('Internet connection offline');
    }
  }

  ionViewDidLeave() {
    console.log("Back Pressed");
  }


  //Function for replace encoded unicode special symbols
  //with decoded special symbols
  setTitle(title) {
    var str = title;
    str = str.replace(/&#8217;/gi, "'");
    str = str.replace(/&amp;/gi, "&");
    return str;
  }

  getConcejales() {
    this.presentLoadingDefault();
    this.wp.getConcejales().then(data => {
      this.loading.dismiss();
      this.response = data;
      this.items = this.response.posts;
    }).catch(err => {
      this.loading.dismiss();
      this.presentToast("Something went wrong!");
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
