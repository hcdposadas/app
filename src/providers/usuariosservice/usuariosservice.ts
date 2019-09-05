import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';

@Injectable()
export class UsuariosService {

  constructor(public http: Http) {

  }

  //Obtener ramas
  getCombo() {
    return this.http.get('/assets/json/ramas.json')
  }  

}
