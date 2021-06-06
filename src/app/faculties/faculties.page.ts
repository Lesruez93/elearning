import {Component, OnInit} from '@angular/core';
import {AngularFireStorage} from '@angular/fire/storage';
import {AngularFirestore} from '@angular/fire/firestore';
import {LoadingController, NavController, ToastController} from '@ionic/angular';
import {AngularFireAuth} from '@angular/fire/auth';

@Component({
  selector: 'app-faculties',
  templateUrl: './faculties.page.html',
  styleUrls: ['./faculties.page.scss'],
})
export class FacultiesPage implements OnInit {
  private uid: any;
  private user: any;
   fac: any;
  addFac: boolean;
  facs: any;

  constructor(private storage:AngularFireStorage,
              private afs:AngularFirestore,
              private nav:NavController,
              private afAuth:AngularFireAuth,
              private toastCtrl:ToastController,
              private loadingCtrl:LoadingController) { }

  ngOnInit() {
this.afs.collection("facs").valueChanges({idField:"docid"}).subscribe((res:any)=>{
 this.facs = res
})
  }

  async submit() {
    if (this.fac ) {
      const loading = await this.loadingCtrl.create({
        message:'Submitting',
        duration:10000
      });
      await loading.present();
      const data ={
       title:this.fac
      };
      this.afs.collection('facs').add(data).then(()=>{
    this.addFac = false
        loading.dismiss();
        this.toast('Done','success');
       this.fac = null
      }).catch(()=>{
        loading.dismiss();
        this.toast('Failed please try agian','danger');

      })
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

  delete(f: any) {
    this.afs.collection('facs').doc(f.docid).delete().then()

  }
}
