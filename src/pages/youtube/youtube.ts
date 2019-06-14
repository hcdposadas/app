import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { YoutubeVideoPlayer } from '@ionic-native/youtube-video-player';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@IonicPage()
@Component({
  selector: 'page-youtube',
  templateUrl: 'youtube.html',
})
export class YoutubePage {

  channelID: string = 'UC7Nfr13PyP84jWgU5FS9LGg';
  maxResults: string = '50';
  pageToken: string;
  googleToken: string = 'AIzaSyDntBVqRDllynW9o0EwKCAi6LGMva9Ric8';
  //searchQuery: string = 'Pst. David Olusegun';
  posts: any = [];
  no_result: boolean = false;
  loader: any;

  constructor(public loading: LoadingController, public http: Http, private youtube: YoutubeVideoPlayer, public navCtrl: NavController, public navParams: NavParams) {  

    this.loader = this.loading.create({

      content: 'Cargando videos'
    });

    this.loader.present().then(() => {

      this.fetchData();
    });
  
  } 

  fetchData() {

    let url = 'https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=' +
    this.channelID + '&type=video&order=date&maxResults=' +
    this.maxResults + '&key=' + this.googleToken;

    if (this.pageToken) {
        url +=  '&pageToken=' + this.pageToken;
    }

    this.http.get(url).map(res => res.json()).subscribe(data => {
      console.log(data.items);
      
    this.posts = this.posts.concat(data.items);
    },

    (error => {

      this.no_result= true;

      this.loader.dismiss();
    }),

    () => {
        this.loader.dismiss();
    });

  }

  playVideo (e, post){

    console.log(post);

    this.youtube.openVideo(post.id.videoId);

  }

}