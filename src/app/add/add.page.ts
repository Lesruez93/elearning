import { Component, OnInit } from '@angular/core';
import {AngularFireStorage} from '@angular/fire/storage';
import {finalize} from 'rxjs/operators';
import {Observable, Subscription} from 'rxjs';
import {LoadingController, NavController, ToastController} from '@ionic/angular';
import {AngularFirestore} from '@angular/fire/firestore';
import {AngularFireAuth} from '@angular/fire/auth';

@Component({
  selector: 'app-add',
  templateUrl: './add.page.html',
  styleUrls: ['./add.page.scss'],
})
export class AddPage implements OnInit {
  department: any;
  dpts: any = ['IT', 'History'];
  file_types: any = ["Document","Video","Audio","Image"];
  file_type: any = "Document";
  notes: any;
  file: any;
   uploadPercent: Observable<number | 0>;
   getCancelButton: boolean;
   upload: Subscription;
   downloadURL: Observable<any>;
     uid: any;
     user: any;


  constructor(private storage:AngularFireStorage,
              private afs:AngularFirestore,
              private nav:NavController,
              private afAuth:AngularFireAuth,
              private toastCtrl:ToastController,
              private loadingCtrl:LoadingController) { }

  ngOnInit() {
  this.afAuth.authState.subscribe((res:any)=>{
   this.uid = res.uid;
   this.afs.collection('users').doc(res.uid).valueChanges().subscribe((data)=>{
       this.user = data
   })
  })
  }
 async uploadFile(event) {


  const loading = await this.loadingCtrl.create({
      message:'Uploading....  ',
      duration:10000
    });
    await loading.present();


      const file = event.target.files[0];
      const filePath = Date.now().toString();
      const fileRef = this.storage.ref(filePath);
      const task = this.storage.upload(filePath, file);

      // observe percentage changes
      this.uploadPercent = task.percentageChanges();
      // get notified when the download URL is available
      this.getCancelButton = false;

      this.upload =  task.snapshotChanges().pipe(
          finalize(() =>
              {
                this.downloadURL = fileRef.getDownloadURL();
                fileRef.getDownloadURL().subscribe(x=>{console.log(x);
                  this.file = x;
                  loading.dismiss();

                });
              }
          ))
          .subscribe()


    }


  change() {

  }

 async submit() {
      if (this.file ) {
          const loading = await this.loadingCtrl.create({
              message:'Submitting',
              duration:10000
          });
          await loading.present();
          const data ={
              file:this.file,
              file_type:this.file_type,
              name:this.user.name,
              department:this.user.department,
              uid:this.uid,
              notes:this.notes,
              time:Date.now()
          };
          this.afs.collection('materials').add(data).then(()=>{

              loading.dismiss();
              this.toast('Done','success');
              this.nav.pop()
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
}
