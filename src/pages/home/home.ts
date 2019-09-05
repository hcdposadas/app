import { Component, ViewChild } from '@angular/core';
import { NavController, InfiniteScroll, ToastController, LoadingController, Loading, IonicPage } from 'ionic-angular';
import { WpProvider } from '../../providers/wp/wp';
import { Network } from '@ionic-native/network';
import { VarGlobalProvider } from '../../providers/var-global/var-global';
import { Slides } from 'ionic-angular';

declare var moment: any;

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  /*tab1Root = HomePage;
  tab2Root = BloquesPage;
  */

  @ViewChild(Slides) slides: Slides;
  items: any = [];
  data: any = [];
  response: any = [];
  response2: any = [];
  offset = 1;
  loading: Loading;
  networkStatus: any;

  constructor(public navCtrl: NavController, 
              public wp: WpProvider,
              private toastCtrl: ToastController,
              public loadingCtrl: LoadingController, 
              private network: Network,
              public GVP: VarGlobalProvider) { }

  goToSlide() {
    this.slides.slideTo(2, 500);
  }
  
  ngAfterViewInit() {  setTimeout(()=>{
    if(this.items && this.items.length > 0){
      // this.slides.autoplay = 2000;
      this.slides.speed = 500;
      this.slides.pager = true;
      this.slides.startAutoplay()
     }

     },1000)
   }

  ionViewDidLoad() {
    let type = this.network.type;
    this.networkStatus = type;
    if (type == 'none') {
      this.presentToast('Internet connection offline');
    }
    else {
      try {
        this.presentLoadingDefault();
        this.GVP.getNews().subscribe(res => {
          if (res.length > 0) {
            this.items = res;
            console.log('this.items', this.items);
          };
        });
        this.loading.dismiss();
      }
      catch (e) {
        this.loading.dismiss()
      }
    }
  }


  openSearch() {
    this.navCtrl.push('SearchPage');
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
      this.GVP.news = this.response.posts;
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
        this.wp.getPosts(this.offset).then(data => {
          this.response2 = data;
          this.data = this.response2.posts;
          if (this.data.length === 0) {
            infiniteScroll.enable(false);
            this.presentToast("No more data");
          } else {
            for (var i = 0; i < this.data.length; i++) {
              this.items.push(this.data[i]);

            }
            this.GVP.news = [...this.data, ...this.GVP.news]; 
            this.GVP.sendNews(this.GVP.news);//concatena os dados no global
            console.log(this.GVP.news);

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
    return moment(date).locale('es').format('L');
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

  someFunction(){
    
  }

  verNoticias() {
    this.navCtrl.push('NoticiasPage');
  }

  verOrdenanzas($event) {
    this.navCtrl.push('OrdenanzasPage');
  }

  verLegisladores($event) {
    this.navCtrl.push('BloquesPage');
  }

  verAgenda($event) {
    this.navCtrl.push('AgendaPage');
  }

  verEnvivo($event) {
    this.navCtrl.push('VivoPage');
  }

  verContacto($event) {
    this.navCtrl.push('ContactoPage');
  }

  verVideos($event) {
    this.navCtrl.push('YoutubePage');
  }

  verInfo($event) {
    this.navCtrl.push('InfoPage');
  }

}
