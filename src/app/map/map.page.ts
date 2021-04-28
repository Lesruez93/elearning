import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import {Router} from '@angular/router';
import {NavController} from '@ionic/angular';
import {GetterSetterService} from '../getter-setter.service';
import {LocationAccuracy} from '@ionic-native/location-accuracy/ngx';

@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
})
export class MapPage implements OnInit {
    data: any = {};
    lon: number;
    lat: number;


  constructor(

      private navCtrl:NavController,
      private getter:GetterSetterService,
  ) { }

    ngOnInit(): void {
       this.data = this.getter.getParams()

    }

 toNum(n: any) {

    return Number(n)
  }
    home() {
        this.navCtrl.navigateRoot('app/home')

    }





    search() {
        this.navCtrl.navigateRoot('app/search')
    }

    discover() {
        this.navCtrl.navigateRoot('app/discover')

    }

    library() {
        this.navCtrl.navigateRoot('app/library')

    }

}
