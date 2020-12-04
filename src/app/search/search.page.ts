import { Component, OnInit } from '@angular/core';
import {LoadingController, NavController} from '@ionic/angular';
import {HttpClient} from '@angular/common/http';
import {GetterSetterService} from '../getter-setter.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {
  data: any = {};

  constructor(
      private navCtrl:NavController,
      private http:HttpClient,
      private getter:GetterSetterService,
      private loadingCtrL:LoadingController,

  ) { }

  ngOnInit() {
  }

    clear() {

    }

  al() {
    this.navCtrl.navigateRoot('/')
  }

  change($event: CustomEvent<any>) {

  }

  async search(value: any) {
    console.log(value)

 let loader = await this.loadingCtrL.create({
  message:'Searching',

})
await loader.present()
    this.http.get('https://portal.audioguide-namibia.com/search/'+value).subscribe((res:any)=>{
      console.log(res)
      this.data = res

      loader.dismiss()
      console.log(res)
    },error1 => {
      loader.dismiss()
    })
  }

  openDetail(item: any) {
    this.getter.setParams(item)
    this.navCtrl.navigateForward('/tour-detail')

  }
}
