import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import {Router} from '@angular/router';
import {NavController} from '@ionic/angular';
import {GetterSetterService} from '../getter-setter.service';
import {LocationAccuracy} from '@ionic-native/location-accuracy/ngx';

@Component({
  selector: 'app-discover',
  templateUrl: './discover.page.html',
  styleUrls: ['./discover.page.scss'],
})
export class DiscoverPage implements OnInit {
   data: any;
   lon: number;
 lat: number;


  constructor(
      private http:HttpClient,
      private geolocation: Geolocation,
      private locationAccuracy: LocationAccuracy,
      private router: Router,
      private navCtrl:NavController,
      private getter:GetterSetterService,
  ) { }

    ngOnInit(): void {
        this.loadData()

        this.locationAccuracy.canRequest().then((canRequest) => {

            if(canRequest) {
                // the accuracy option will be ignored by iOS
                this.locationAccuracy.request(this.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY).then(
                    () =>

                    {
                        this.geolocation.getCurrentPosition().then((resp) => {
                            console.log(resp)
                            this.lat = resp.coords.latitude
                            this.lon = resp.coords.longitude

                            if(!this.lat && this.lon){
                                alert('Please enable your GPS')
                            }
                        }).catch((error) => {

                            alert("Failed to get your Location. Please enable your GPS Location")
                        });
                    }

                ).catch(()=>{
                    alert("Failed to get your Location. Please enable your GPS Location")

                });
            }

        });


    }
    loadData( ){
        this.http.get('https://portal.audioguide-namibia.com/get-items-list/').subscribe((res:any)=> {
            // this.data  = res.items
            this.data  = res.items
        })

    }
  number(n: any) {

    return Number(n)
  }


    goToDetail(d: any) {
        this.getter.setParams(d)
        this.router.navigateByUrl('/tour-detail')
    }
}
// just an interface for type safety.
interface marker {
  lat: number;
  lng: number;
  label?: string;
  draggable: boolean;
}
