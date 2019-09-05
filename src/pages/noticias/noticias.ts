import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, InfiniteScroll, ToastController, LoadingController, Loading } from 'ionic-angular';
import { WpProvider } from '../../providers/wp/wp';
import { Network } from '@ionic-native/network';

declare var moment: any;

@IonicPage()
@Component({
  selector: 'page-noticias',
  templateUrl: 'noticias.html',
})
export class NoticiasPage {

  items: any = [];
  data: any = [];
  response: any = [];
  response2: any = [];
  offset = 1;
  loading: Loading;
  networkStatus: any;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams, 
              public wp: WpProvider, 
              private toastCtrl: ToastController, 
              public loadingCtrl: LoadingController, 
              private network: Network) {
  }

  ionViewDidLoad() {
    let type = this.network.type;
    this.networkStatus = type;
    if (type != 'none') {
      this.getPosts(this.offset);
    } else {
      this.presentToast('Sin conexión a Internet');
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

  getPosts(offset) {
    this.presentLoadingDefault();
    this.wp.getPosts(offset).then(data => {
      this.loading.dismiss();
      this.response = data;
      this.items = this.response.posts;
    }).catch(err => {
      this.loading.dismiss();
      this.presentToast("Algo ha salido mal!");
    });
  }

  doInfinite(infiniteScroll: InfiniteScroll) {
    setTimeout(() => {
      this.offset = this.offset + 1;
      let type = this.network.type;
      if (type != 'none') {
        this.wp.getPosts(this.offset).then(data => {
          this.response2 = data;
          this.data = this.response2.posts;
          if (this.data.length === 0) {
            infiniteScroll.enable(false);
            this.presentToast("No hay mas noticias");            
          } else {
            for (var i = 0; i < this.data.length; i++) {
              this.items.push(this.data[i]);
            }
            infiniteScroll.complete();
          }
        }).catch(err => {
          infiniteScroll.enable(false);
          this.presentToast("Algo ha salido mal!");
        });
      } else {
        this.presentToast('Sin conexión a Internet');
      }
    }, 1000);

  }

  getDate(date) {
    return moment(date).locale('es').format('l');
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
