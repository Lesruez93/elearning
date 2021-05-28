import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {LoadingController, ToastController} from '@ionic/angular';

@Component({
  selector: 'app-report',
  templateUrl: './report.page.html',
  styleUrls: ['./report.page.scss'],
})
export class ReportPage implements OnInit {
gvt = ["National Government", 'Provincial Government', 'Local Government'];
provinces = ['Harare', 'Bulawayo', 'Manicaland', 'Mashonaland Central', 'Masvingo', 'Midlands'];
  gvnt: any;
  province: any;
  amount: any;
  details: any;
  private loading: any;
  constructor(
      private http:HttpClient,
      private loadingCtrl:LoadingController,
      private toastCtrl:ToastController
  ) { }

  ngOnInit() {
  }

  submit() {
if (this.details){

  const data ={
    province:this.province,
    details:this.details,
    government:this.gvnt,
    amount:this.amount,
  };


this.loader();
  this.http.post('https://formspree.io/f/mnqldada',{email:'mashvee@gmail.com', replyto: 'mashvee@gmail.com', data:JSON.stringify(data)})
      .subscribe(res=>{
this.dismiss();
this.toast('Thank you your feedback has been submitted','success')
      },error1 => {
        this.dismiss();
        this.toast('Something went wrong please try again','danger')


      })
}else {
  this.toast('Corruption details required','danger')

}

  }

  async loader(){
    this.loading = await this.loadingCtrl.create({
      message:'Submitting'
    });
    await this.loading.present()
  }

  dismiss()
  {this.loading.dismiss()

  }

  async toast(msg,color){
    const toast = await this.toastCtrl.create({
      message:msg,
      duration:3000,
      position:'top',
      color:color
    });
    await toast.present()
  }
}
