import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController, Loading, Slides } from 'ionic-angular';
import { WpProvider } from '../../providers/wp/wp';
import { Network } from '@ionic-native/network';
import { InAppBrowser, InAppBrowserOptions } from '@ionic-native/in-app-browser';

@IonicPage()
@Component({
  selector: 'bloques-posts',
  templateUrl: 'bloques.html',
})
export class BloquesPage {

  @ViewChild('slider') slider: Slides;
  legisladores = "concejales";

  items: any = [];
  items2: any = [];
  data: any = [];
  data2: any = [];
  response: any = [];
  response2: any = [];
  prevData: any;
  offset = 1;
  loading: Loading;
  networkStatus: any;

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
              public wp: WpProvider, 
              private toastCtrl: ToastController, 
              public loadingCtrl: LoadingController, 
              private network: Network,
              private theInAppBrowser: InAppBrowser) {
              this.prevData = this.navParams.get('data');
  }

  ionViewDidLoad() {
    let type = this.network.type;
    this.networkStatus = type;
    if (type != 'none') {
      this.getConcejales();
      this.getAutoridades();
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
      this.presentToast("Algo salio mal!");
    });
  }

  getAutoridades() {
    //this.presentLoadingDefault();
    this.wp.getAutoridades().then(data2 => {
      //this.loading.dismiss();
      this.response2 = data2;
      this.items2 = this.response2.posts;
    }).catch(err => {
      //this.loading.dismiss();
      //this.presentToast("Something went wrong!");
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

  selectedTab(index) {
    this.slider.slideTo(index);
  }

  abrirFB (item){
    let target = "_system";
    this.theInAppBrowser.create(item.custom_fields.Facebook[0],target,this.options);
  }

  abrirTW (item){
    let target = "_system";
    this.theInAppBrowser.create(item.custom_fields.Twitter[0],target,this.options);
  }

}
