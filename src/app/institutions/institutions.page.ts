import { Component, OnInit } from '@angular/core';
import {AngularFireStorage} from '@angular/fire/storage';
import {AngularFirestore} from '@angular/fire/firestore';
import {LoadingController, NavController, ToastController} from '@ionic/angular';
import {AngularFireAuth} from '@angular/fire/auth';

@Component({
  selector: 'app-institutions',
  templateUrl: './institutions.page.html',
  styleUrls: ['./institutions.page.scss'],
})
export class InstitutionsPage implements OnInit {
  addInst: boolean;
  inst: any;
  insts: any;

  constructor(private storage:AngularFireStorage,
              private afs:AngularFirestore,
              private nav:NavController,
              private afAuth:AngularFireAuth,
              private toastCtrl:ToastController,
              private loadingCtrl:LoadingController) { }

  ngOnInit() {
    this.afs.collection("insts").valueChanges({idField:"docid"}).subscribe((res:any)=>{
      this.insts = res
    })
  }

  async submit() {
    if (this.inst ) {
      const loading = await this.loadingCtrl.create({
        message:'Submitting',
        duration:10000
      });
      await loading.present();
      const data ={
        title:this.inst
      };
      this.afs.collection('insts').add(data).then(()=>{
        this.addInst = false;
        loading.dismiss();
        this.toast('Done','success');
this.inst = null
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
    this.afs.collection('insts').doc(f.docid).delete().then()

  }
}
