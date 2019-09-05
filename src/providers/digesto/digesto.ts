import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';


@Injectable()
export class DigestoProvider {

  constructor(public http: Http) {
  }

    //Obtener ramas
    getRamas() {
      return new Promise((resolve, reject) => {
        this.http.get('http://digesto.hcdposadas.gob.ar/api/ramas.json')
          .do(this.logResponse)
          .map(this.extractResponse)
          .subscribe(data => {
            resolve(data);
          },
          error => {
            reject(error);
            console.error(error);
          }
          );
      });
    } 
  

  //Obtener ordenanzas
  /* getOrdenanzas(pageno) {
    return new Promise((resolve, reject) => {
      this.http.get(this.DIGESTOBASEURL +'?json=get_category_posts&slug=noticias&count=10&page='+pageno)
        .do(this.logResponse)
        .map(this.extractResponse)
        .subscribe(data => {
          resolve(data);
        },
        error => {
          reject(error);
          console.error(error);
        }
        );
    });
  }
  */

  //To get response of search results
  /*
  searchPost(pageno, query) {
    return new Promise((resolve, reject) => {
      this.http.get(this.DIGESTOBASEURL + '?json=get_search_results&count=20&page='+pageno+'&search='+query)
        .do(this.logResponse)
        .map(this.extractResponse)
        .subscribe(data => {
          resolve(data);
        },
        error => {
          reject(error);
          console.error(error);
        }
        );
    });
  }
  */

  //Function for replace encoded unicode special symbols
  //with decoded special symbols
  setTitle(title) { 
    var str = title;
    str = str.replace(/&#8217;/gi, "'");
    str = str.replace(/&amp;/gi, "&");
    str = str.replace(/&#038;/gi, "&");
    str = str.replace(/&#8220;/gi, "\“");
    str = str.replace(/&#8221;/gi, "\”");
    str = str.replace(/&#8211;/gi, "\-");
    return str;
  }

  //To display response on console
  private logResponse(res: Response) {
    console.log(res);
  }

  //To extract json response and display on console
  private extractResponse(res: Response) {
    console.log(res.json());
    return res.json();
  }

}
