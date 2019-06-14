import { Component } from '@angular/core';
import { ViewController, AlertController, ToastController, NavParams } from 'ionic-angular';

/**
 * Generated class for the PopoverContentComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'popover-content',
  templateUrl: 'popover-content.html'
})
export class PopoverContentComponent {


  popoverItemList: any;

  constructor(public viewCtrl: ViewController, private alertCtrl: AlertController, private toastCtrl: ToastController, public navparams: NavParams) {
    this.popoverItemList = [{ name: 'Open In Browser' }];
    
  }

  setSelectedTitle(selectedItem) {
    if (selectedItem === 'Open In Browser') {
      let data = this.navparams.get('obj');
      console.log(data);
      window.open(data.url, '_target');
    }
    this.viewCtrl.dismiss();
  }

  presentToast(text) {
    let toast = this.toastCtrl.create({
      message: text,
      duration: 3000,
      position: 'bottom',
    });
    toast.present();
  }

  presentAlert(message) {
    let alert = this.alertCtrl.create({
      title: 'Alert',
      subTitle: message,
      buttons: ['Ok']
    });
    alert.present();
  }

}
