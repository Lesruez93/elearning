import { Component, OnInit, HostBinding, ViewChild } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

import { LocationAccuracy } from '@ionic-native/location-accuracy/ngx';

import {AlertController, NavController} from '@ionic/angular';

import { TranslateService } from '@ngx-translate/core';
import {HttpClient} from '@angular/common/http';
import {Geolocation} from '@ionic-native/geolocation/ngx';
import {GetterSetterService} from '../getter-setter.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.html',
  styleUrls: [
    './styles/home.page.scss',
    './styles/home.shell.scss',
    './styles/home.ios.scss',
    './styles/home.md.scss'
  ],
})
export class HomePage implements OnInit {

  available_languages = [];
  translations;
 data: any;
    private lat: number;
    private lon: number;



  constructor(
    private route: ActivatedRoute,
    public translate: TranslateService,
    private router: Router,
    private navCtrl:NavController,
    private geolocation: Geolocation,
    private getter:GetterSetterService,
    public alertController: AlertController,
    private locationAccuracy: LocationAccuracy,
    private http:HttpClient,
  ) {

      this.geolocation.getCurrentPosition().then((resp) => {
          console.log(resp)
          this.lat = resp.coords.latitude;
          this.lon = resp.coords.longitude;

          if(!this.lat && this.lon){
              alert('Please enable your GPS')
          }
          this.loadData(this.lat , this.lon)
      }).catch((error) => {

          alert("Failed to get your Location. Please enable your GPS Location")
      });
  }


  ngOnInit(): void {
      this.locationAccuracy.canRequest().then((canRequest) => {

          console.log(canRequest)
          if(canRequest) {
              // the accuracy option will be ignored by iOS
              this.locationAccuracy.request(this.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY).then(
                  (res) =>

                  {
                      console.log(res)
                      this.geolocation.getCurrentPosition().then((resp) => {
                          console.log(resp)
                          this.lat = resp.coords.latitude;
                          this.lon = resp.coords.longitude;

                          if(!this.lat && this.lon){
                              alert('Please enable your GPS')
                          }
                          this.loadData(this.lat , this.lon)
                      }).catch((error) => {

                          alert("Failed to get your Location. Please enable your GPS Location")
                      });
                  }

              ).catch((er)=>{
                  console.log(er)
                  alert("Failed to get your Location. Please enable your GPS Location")

              });
          }

      }).catch(er=>console.log(er));



  }




  getTranslations() {
    // get translations for this page to use in the Language Chooser Alert
    this.translate.getTranslation(this.translate.currentLang)
    .subscribe((translations) => {
      this.translations = translations;
    });
  }


  al() {
  //  alert('da')
  }

  openDetail(value) {
    this.getter.setParams(value)
    this.router.navigateByUrl('/tour-detail')
  }

    search() {
        this.navCtrl.navigateRoot('/search')
    }

    doRefresh(event) {
        setTimeout(() => {

            console.log('Async operation has ended');
            event.target.complete();
        }, 3000);
    }

    loadData(lat ,lon ){
        this.http.get('https://portal.audioguide-namibia.com/get-items-list/'+lon+'/'+lat).subscribe((res:any)=> {
            // this.data  = res.items
            this.data  = res.items.slice(0,4)
        })

    }
}
