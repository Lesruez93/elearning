import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {LoadingController, ToastController} from '@ionic/angular';
import {Router} from '@angular/router';
import {AngularFireAuth} from '@angular/fire/auth';
import {AngularFirestore} from '@angular/fire/firestore';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  dpts: any = ['IT',"History"];

  password: any;
  email: any;

  private loading: any;
  department: any;
  name: any;
  role: any;
  roles: any = ['Lecturer','Student'];
  constructor(
      private http:HttpClient,
      private loadingCtrl:LoadingController,
      private toastCtrl:ToastController,
      private router:Router,
      private afs:AngularFirestore,
      private afAuth:AngularFireAuth
  ) { }

  ngOnInit() {
  }

 async submit() {
    if (this.email && this.password && this.name && this.department && this.role){




      const loading =  await this.loadingCtrl.create({
        message:'Submitting'
      });
    await  loading.present();


      this.afAuth.createUserWithEmailAndPassword(this.email,this.password).then(res=>{
          const data ={
              email:this.email,
              department:this.department,
              name:this.name,
              uid:res.user.uid,
              role:this.role,


          };
        this.dismiss().catch();
        this.afs.collection('users').doc(res.user.uid).set(data).then(()=>{
          this.toast("Registration Successful",'success').then().catch();
          loading.dismiss();
          this.router.navigate(['./'])
        }).catch(()=>{
          this.toast("Something went wrong please try again",'danger').then().catch();
          loading.dismiss();
        })
      },error1 => {

        this.toast(error1.message,'danger').then().catch();
        loading.dismiss()



      })
    }else {
      this.toast('All fields are  required','danger')

    }

  }

  async loader(){

  }

async  dismiss()
  {
     if (this.loading){
   await    this.loading.dismiss().catch()
     }

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
