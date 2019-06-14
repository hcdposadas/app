import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, InfiniteScroll, ToastController, LoadingController, Loading } from 'ionic-angular';
import { WpProvider } from '../../providers/wp/wp';
import { Network } from '@ionic-native/network';

declare var moment: any;
/**
 * Generated class for the CategoryPostsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-category-posts',
  templateUrl: 'category-posts.html',
})
export class CategoryPostsPage {

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
      this.getCategoryPosts(this.prevData.slug, this.offset);
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

  getCategoryPosts(slug, offset) {
    this.presentLoadingDefault();
    this.wp.getCategoryPosts(slug, offset).then(data => {
      this.loading.dismiss();
      this.response = data;
      this.items = this.response.posts;
    }).catch(err => {
      this.loading.dismiss();
      this.presentToast("Something went wrong!");
    });
  }

  doInfinite(infiniteScroll: InfiniteScroll) {
    setTimeout(() => {
      this.offset = this.offset + 1;
      let type = this.network.type;
      if (type != 'none') {
        this.wp.getCategoryPosts(this.prevData.slug, this.offset).then(data => {
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
