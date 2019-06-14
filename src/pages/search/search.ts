import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController, Loading, InfiniteScroll } from 'ionic-angular';
import { WpProvider } from '../../providers/wp/wp';
import { Network } from '@ionic-native/network';

declare var moment: any;
/**
 * Generated class for the SearchPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
})
export class SearchPage {
  items: any = [];
  data: any = [];
  response: any = [];
  response2: any = [];
  offset = 1;
  searchString: any;
  loading: Loading;
  networkStatus: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public wp: WpProvider, private toastCtrl: ToastController, public loadingCtrl: LoadingController, private network: Network) {}

  ionViewDidLoad() {
  }

  getItems(val) {

    if (val && val.trim() != '') {
      this.searchString = val.trim();
      let type = this.network.type;
      this.networkStatus = type;
      if (type != 'none') {
        this.searchPost(this.offset, val.trim());
      } else {
        this.presentToast('Internet connection offline');
      }
    } else {
      console.log('Empty');
      this.items = [];
    }
  }

  searchPost(pageno, query) {
    this.presentLoadingDefault();
    this.wp.searchPost(pageno, query).then(data => {
      this.loading.dismiss();
      this.response = data;
      this.items = this.response.posts;
    }).catch(err => {
      this.loading.dismiss();
      this.presentToast("Something went wrong!");
    })
  }

  doInfinite(infiniteScroll: InfiniteScroll) {
    setTimeout(() => {
      this.offset = this.offset + 1;
      let type = this.network.type;
      if (type != 'none') {
        this.wp.searchPost(this.offset, this.searchString).then(data => {
          this.response2 = data;
          this.data = this.response2.posts;
          if (this.data.length === 0) {
            infiniteScroll.enable(false);
            this.presentToast("No more data");
          } else {
            for (var i = 0; i < this.data.length; i++) {
              this.items.push(this.data[i]);
            }
            infiniteScroll.complete();
          }
        }).catch(err => {
          infiniteScroll.enable(false);
          this.presentToast("Something went wrong!");
        });
      } else {
        this.presentToast('Internet connection offline');
      }
    }, 1000);

  }


  //Function for replace encoded unicode special symbols
  //with decoded special symbols
  setTitle(title) {
    var str = title;
    str = str.replace(/&#8217;/gi, "'");
    str = str.replace(/&amp;/gi, "&");
    return str;
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
      dismissOnPageChange: true,
      enableBackdropDismiss: true
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
