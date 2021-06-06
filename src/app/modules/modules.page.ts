import { Component, OnInit } from '@angular/core';
import {AngularFireStorage} from '@angular/fire/storage';
import {AngularFirestore} from '@angular/fire/firestore';
import {LoadingController, NavController, ToastController} from '@ionic/angular';
import {AngularFireAuth} from '@angular/fire/auth';

@Component({
  selector: 'app-modules',
  templateUrl: './modules.page.html',
  styleUrls: ['./modules.page.scss'],
})
export class ModulesPage implements OnInit {
  addModule: boolean;
   module: any;
 modules: any;
   insts: any;
   facs: any;
  inst: any;
  fac: any;

  constructor(private storage:AngularFireStorage,
              private afs:AngularFirestore,
              private nav:NavController,
              private afAuth:AngularFireAuth,
              private toastCtrl:ToastController,
              private loadingCtrl:LoadingController) { }

  ngOnInit() {
    this.afs.collection("modules").valueChanges({idField:"docid"}).subscribe((res:any)=>{
      this.modules = res
    });


    this.afs.collection("insts").valueChanges({idField:"docid"}).subscribe((res:any)=>{
      this.insts = res
    });
    this.afs.collection("facs").valueChanges({idField:"docid"}).subscribe((res:any)=>{
      this.facs = res
    })
  }

  async submit() {
    if (this.module ) {
      const loading = await this.loadingCtrl.create({
        message:'Submitting',
        duration:10000
      });
      await loading.present();
      const data ={
        title:this.module
      };
      this.afs.collection('modules').add(data).then(()=>{
        this.addModule = false;
        loading.dismiss();
        this.toast('Done','success');
        this.module = null
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
    this.afs.collection('modules').doc(f.docid).delete().then()

  }
}
