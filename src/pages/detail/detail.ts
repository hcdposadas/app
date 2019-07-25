import { App } from './../../app/app.global';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController, LoadingController, ToastController, Loading } from 'ionic-angular';
import { PopoverContentComponent } from '../../components/popover-content/popover-content';
import { SocialSharing } from '@ionic-native/social-sharing';
import { WpProvider } from '../../providers/wp/wp';
import { VarGlobalProvider } from '../../providers/var-global/var-global';
import { InAppBrowser, InAppBrowserOptions } from '@ionic-native/in-app-browser';

declare var moment: any;

@IonicPage()
@Component({
  selector: 'page-detail',
  templateUrl: 'detail.html',
})
export class DetailPage {

  data: any;
  star: any;
  loading: Loading;
  idNovidad: number;
  indice: any;
  achei: number;

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

  constructor(public navCtrl: NavController, public navParams: NavParams, 
    public popoverCtrl: PopoverController, private toastCtrl: ToastController, 
    public loadingCtrl: LoadingController, private socialSharing: SocialSharing, 
    public wp: WpProvider, public GVP: VarGlobalProvider, private theInAppBrowser: InAppBrowser) {

    this.idNovidad = this.navParams.get('IDNovidad');

    if (this.idNovidad > 0) //se vier do Onesignal e tiver o ID > 0, vai pesquisar no array de noticias pra achar o Index 
      this.showNew(this.GVP.news,this.idNovidad);
      else
      this.data = this.navParams.get('data'); // caso contrario pega o click da home

  }

  showNew(dados, idNovidad) {   

    if (this.indice >= 0)
      this.achei = this.indice //se achar a noticia
    else
      this.achei = dados.findIndex(obj => { // se nao ele procura e retorna o ID
        return obj.id == idNovidad;
      });

   //  console.log(this.achei);
     
    if (this.achei < 0) {  // se não existi a noticia ele busca novamente na interne / API 
      
        this.wp.getPosts(1).then(data => {        
          this.GVP.news = data['posts']; // atualiza a lita de news global
          this.data =  this.GVP.news[this.achei];
        }).catch(err => {
           this.navCtrl.pop(); // se tiver erro retorna para tela principal
        }); 
      

    }
    else
    this.data = dados[this.achei];// this.VerViewDidEnter(dados);
  }

  ionViewDidLoad() { 
    console.log('Aqui Detail news ',this.GVP.news);
    
    console.log(this.data);
    this.checkBookmark();
    console.log(this.star);
    
  }

  sharePost(title, url) {
    this.socialSharing.share('Leer Noticias: ' + title + ' Usando la app ' + App.AppName +' \nSource: ', '', '', url).then(data => {

    }).catch(err => {

    });
  }

  //Function for replace encoded unicode special symbols
  //with decoded special symbols
  setTitle(title) {
    var str = title;
    str = str.replace(/&#8217;/gi, "'");
    str = str.replace(/&amp;/gi, "&");
    return str;
  }

  goToBookmark() {
    this.presentLoadingDefault();
    let bookmarkItems = JSON.parse(localStorage.getItem('bookmarkItems'));
    let localData = bookmarkItems ? bookmarkItems : [];
    if (!this.star) { // add to bookmark
      if (localData.length > 0) {
        let object = {
          id: this.data.id,
          star: true,
          url: this.data.url,
          excerpt: this.data.excerpt,
          content: this.data.content,
          thumbnail: this.data.thumbnail,
          title: this.data.title,
          modified: this.data.modified,
          comment_count: this.data.comment_count
        }
        this.star = true;
        localData.push(object);
        this.loading.dismiss();
        localStorage.setItem('bookmarkItems', JSON.stringify(localData));
        this.presentToast("Agregado a favoritos");
      } else {
        this.star = true;
        let array = [];
        let object = {
          id: this.data.id,
          star: true,
          url: this.data.url,
          content: this.data.content,
          excerpt: this.data.excerpt,
          thumbnail: this.data.thumbnail,
          title: this.data.title,
          modified: this.data.modified,
          comment_count: this.data.comment_count
        }
        array.push(object);
        this.loading.dismiss();
        localStorage.setItem('bookmarkItems', JSON.stringify(array));
        this.presentToast("Agregado a favoritos");
      }
    } else { //remove from bookmark
      let object = {
        id: this.data.id,
        star: true,
        url: this.data.url,
        excerpt: this.data.excerpt,
        content: this.data.content,
        thumbnail: this.data.thumbnail,
        title: this.data.title,
        modified: this.data.modified,
        comment_count: this.data.comment_count
      }
      for (let index = 0; index < localData.length; index++) {
        if (object.id === localData[index].id) {
          this.star = false;
          localData.splice(index, 1);
          this.loading.dismiss();
          localStorage.setItem('bookmarkItems', JSON.stringify(localData));
          this.presentToast("Removed from bookmarks");
          break;
        }
      }
    }

  }

  checkBookmark() {
    let bookmarkItems = JSON.parse(localStorage.getItem('bookmarkItems'));
    let localData = bookmarkItems ? bookmarkItems : [];
    if (localData.length > 0) {
      let object = {
        id: this.data.id,
        star: true,
        thumbnail: this.data.thumbnail,
        title: this.data.title,
        modified: this.data.modified,
        comment_count: this.data.comment_count
      }
      for (let index = 0; index < localData.length; index++) {
        if (object.id === localData[index].id) {
          this.star = localData[index].star; // call remove bookmark
          break;
        } else {
          this.star = false; //call add bookmark
        }
      }
    } else {
      this.star = false; //call add bookmark
    }
  }

  openPopover(myEvent) {
    let obj = {
      url: this.data.url
    }
    let popover = this.popoverCtrl.create(PopoverContentComponent, { obj });
    popover.present({
      ev: myEvent
    });
  }

  getDate(date) {
    return moment(date).format('ll');
  }

  presentLoadingDefault() {
    this.loading = this.loadingCtrl.create({
      spinner: 'dots',
      content: 'Por favor espere...',
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

  abrirPDF (item){
    let target = "_system";
    this.theInAppBrowser.create(item.archivo.url,target,this.options);
  }

}
