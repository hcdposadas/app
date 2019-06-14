import { App } from './../../app/app.global';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController, LoadingController, ToastController, Loading } from 'ionic-angular';
import { PopoverContentComponent } from '../../components/popover-content/popover-content';
import { SocialSharing } from '@ionic-native/social-sharing';
import { WpProvider } from '../../providers/wp/wp';

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

  constructor(public navCtrl: NavController, public navParams: NavParams, public popoverCtrl: PopoverController, private toastCtrl: ToastController, public loadingCtrl: LoadingController, private socialSharing: SocialSharing, public wp: WpProvider) {
  }

  ionViewDidLoad() {
    this.data = this.navParams.get('data');
    console.log(this.data);
    this.checkBookmark();
    console.log(this.star);
    
  }

  sharePost(title, url) {
    this.socialSharing.share('Leer Noticias: ' + title + ' Using app ' + App.AppName +' \nSource: ', '', '', url).then(data => {

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
}
