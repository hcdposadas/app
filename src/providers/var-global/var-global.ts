import { Injectable } from '@angular/core';
import { ToastController } from 'ionic-angular';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class VarGlobalProvider {
  
  public news:any[];
  private _gvpNews$ = new BehaviorSubject<any[]>([]);
  constructor( public toastCtrl: ToastController, ) {
  
  }

  sendNews(news?: any) {
    this._gvpNews$.next(news);
  }

  getNews(): Observable<any> {
    return this._gvpNews$.asObservable();
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
