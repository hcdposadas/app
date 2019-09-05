import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController, Loading} from 'ionic-angular';
import { WpProvider } from '../../providers/wp/wp';
import { Network } from '@ionic-native/network';
import { IonicSelectableComponent } from 'ionic-selectable';

declare var moment: any;

class Port {
  public id: number;
  public titulo: string;
}

@IonicPage()
@Component({
  selector: 'ordenanzas-posts',
  templateUrl: 'ordenanzas.html',
})
export class OrdenanzasPage {

  items: any = [];
  items2: any;
  noData: boolean = false;
  pageno: any;
  data: any = [];
  data2: any = [];
  response: any = [];
  response2: any = [];
  prevData: any;
  offset = 1;
  id: any;
  loading: Loading;
  networkStatus: any;
  idRama:any;
  ports: Port[];
  port: Port;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public wp: WpProvider,
    private toastCtrl: ToastController,
    public loadingCtrl: LoadingController,
    private network: Network) {
    this.prevData = this.navParams.get('data');
  }

  ionViewDidLoad() {
    let type = this.network.type;
    this.networkStatus = type;
    if (type != 'none') {
      this.getRamas();
    } else {
      this.presentToast('Internet connection offline');
    }
  }

  ionViewDidLeave() {
    console.log("Back Pressed");
  }

  getRamas(ev?) {
    console.log('ev', ev)
    this.presentLoadingDefault();
    this.wp.getRamas().then(data => {
      this.loading.dismiss();
      this.response = data;
      this.items = data;
      this.getOrdenanzas(ev.value.id, this.offset)
      console.log('data', data);
    }).catch(err => {
      this.loading.dismiss();
      // this.presentToast("Something went wrong (ramas)!");
    });
  }

  getOrdenanzas(id, offset) {
    this.idRama = id;
    this.offset = 1;
    this.noData = false;
    this.presentLoadingDefault();
    this.wp.getOrdenanzas(id, this.offset).then(data2 => {
      this.loading.dismiss();
      if (data2) {
        this.response = data2;
        this.items2 = data2;
      }
      else
        this.noData = true;
    }).catch(err => {
      this.loading.dismiss();
      this.presentToast("Algo a salido mal con ordenanzas!");
    });
  }

  doInfinite(infiniteScroll) {
    setTimeout(() => {
      this.offset++;
      let type = this.network.type;
      if (type != 'none') {
        this.wp.getOrdenanzas(this.idRama, this.offset).then(data2 => {
          if (data2) {
            this.response2 = data2;
            for (var i = 0; i < this.response2.length; i++) {
              this.items2.push(data2[i]);
            }           
            infiniteScroll.complete();
          } else {
            infiniteScroll.enable(false);
            this.presentToast("No hay mas ordenanzas");
          }         
        }).catch(err => {
          infiniteScroll.enable(false);
          this.presentToast("Algo ha salido mas con el infiniteScroll de ordenanzas!");
        });
      } else {
        this.presentToast('Internet connection offline');
      }
    }, 1000);

  }

  goToDetail(item) {
    this.navCtrl.push('DetalleOrdenanzasPage', {
      data: item
    })
  }

  portChange(event: {
    component: IonicSelectableComponent,
    value: any
  }) {
    console.log('ramas:', event.value);
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
    return moment(date).locale('es').format('YY');
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
