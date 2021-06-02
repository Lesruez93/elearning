import {Component, OnDestroy, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {LoadingController, MenuController, ToastController} from '@ionic/angular';
import {AngularFireAuth} from '@angular/fire/auth';
import {Router} from '@angular/router';

@Component({
  selector: 'app-signing',
  templateUrl: './signing.page.html',
  styleUrls: ['./signing.page.scss'],
})
export class SigningPage implements OnInit{

  password: any;
  email: any;

  private loading: any;
  constructor(
      private http:HttpClient,
      private loadingCtrl:LoadingController,
      private toastCtrl:ToastController,
      private router:Router,
      private afAuth:AngularFireAuth,
    private menu: MenuController

  ) { }

  ngOnInit() {
      this.afAuth.signOut().then().then();
      this.menu.enable(false)
  }

  submit() {
    if (this.email && this.password){

      const data ={

      };


      this.loader();

          this.afAuth.signInWithEmailAndPassword(this.email,this.password).then(res=>{
            this.dismiss();
           this.router.navigate(['./'])
          },error1 => {
            this.dismiss();
            this.toast(error1.message,'danger')


          })
    }else {
      this.toast('Email and Password  required','danger')

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
   ionViewWillLeave() {
       this.menu.enable(true)
    }
}
