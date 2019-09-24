import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController, Loading } from 'ionic-angular';
import { EmailComposer } from '@ionic-native/email-composer';
import { Network } from '@ionic-native/network';
import { WpProvider } from '../../providers/wp/wp';

@IonicPage()
@Component({
  selector: 'page-contacto',
  templateUrl: 'contacto.html'
})
export class ContactoPage {
  email: {  concejal: string;
            nombreyapellido: string;
            telefono: string;
            mail: string;
            comentario: string;} = {
            concejal: '',
            nombreyapellido: '',
            telefono:'',
            mail:'',
            comentario:''
  };
  loading: Loading;
  networkStatus: any;
  items: any = [];
  data: any = [];
  response: any = [];

  constructor(public navCtrl: NavController, 
              public navParams: NavParams, 
              private emailComposer: EmailComposer,
              private toastCtrl: ToastController, 
              public loadingCtrl: LoadingController, 
              public wp: WpProvider, 
              private network: Network) {
}

  ionViewDidLoad() {
    let type = this.network.type;
    this.networkStatus = type;
    if (type != 'none') {
      this.getConcejales();
    } else {
      this.presentToast('Internet connection offline');
    }
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

  sendEmail() {
  	let email = {
  		to: 'Info@hcdposadas.gob.ar',
  		cc: '',
  		bcc: '',
  		subject: 'Compartí un mate con un concejal',
      body: 'Concejal: '+this.email.concejal +
            '<br> Nombre y Apellido: '+this.email.nombreyapellido +
            '<br> E-mail: '+ this.email.mail +
            '<br> Telefono: '+ this.email.telefono +
            '<br> Comentario: '+ this.email.comentario,
  		isHtml: true
  	};
  	this.emailComposer.open(email);
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
