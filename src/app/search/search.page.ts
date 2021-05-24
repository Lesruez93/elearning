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
  filter: boolean;
  region: any = 'windhoek';
  searching:boolean;
  regions: any;

  constructor(
      private navCtrl:NavController,
      private http:HttpClient,
      private getter:GetterSetterService,
      private loadingCtrL:LoadingController,

  ) { }

  ngOnInit() {
    this.http.get('https://portal.audioguide-namibia.com/categories/').subscribe((res:any)=>{
      this.regions = res.categories
    },error1 => {})
  }



  al() {
    this.navCtrl.navigateRoot('/')
  }



    async search(value: any) {

      this.searching = true;
  setTimeout(()=>{

    this.filter = false;
  },1000);
//  let loader = await this.loadingCtrL.create({
//   message:'Searching',
//
// })
// await loader.present()

    this.http.get('https://portal.audioguide-namibia.com/search/'+value).subscribe((res:any)=>{
      console.log(res);
      this.data = res;
      if (res.items.length == 0  || res.items.length == undefined)
      {
        alert('No results were found try again!')
      }

      //loader.dismiss()
      this.searching = false;
    },error1 => {
     // loader.dismiss()
      this.searching = false;
      alert('Something went wrong:!')

    })
  }

  openDetail(item: any) {
    this.getter.setParams(item)
    this.navCtrl.navigateForward('/tour-detail')

  }
}
