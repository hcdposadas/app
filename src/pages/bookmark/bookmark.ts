import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { WpProvider } from '../../providers/wp/wp';

declare var moment: any;
/**
 * Generated class for the BookmarkPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-bookmark',
  templateUrl: 'bookmark.html',
})
export class BookmarkPage {

  items: any = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public wp: WpProvider) {
  }

  ionViewDidEnter() {
    let bookmarkItems = JSON.parse(localStorage.getItem('bookmarkItems'));
    this.items = bookmarkItems ? bookmarkItems : [];
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

}
