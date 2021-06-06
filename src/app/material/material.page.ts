import { Component, OnInit } from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {NavController} from '@ionic/angular';
import {AngularFireAuth} from '@angular/fire/auth';
import {GetterSetterService} from '../getter-setter.service';

@Component({
  selector: 'app-material',
  templateUrl: './material.page.html',
  styleUrls: ['./material.page.scss'],
})
export class MaterialPage implements OnInit {
  materials: any;
  private uid: any;
  user: any;

  constructor( private afs:AngularFirestore,
               private nav:NavController,
               public gs:GetterSetterService,
               private afAuth:AngularFireAuth) { }

  ngOnInit() {
    this.afAuth.authState.subscribe((res:any)=>{
      this.uid = res.uid;
      this.afs.collection('users').doc(res.uid).valueChanges({idField:"docid"}).subscribe((data:any)=>{
        this.user = data;
        if (data.role != 'admin'){
          this.afs.collection('materials',ref => ref.where('department','==',data.department).where('status', '==','approved').orderBy('date','asc')).valueChanges({idField:'docid'}).subscribe((data)=>{
            this.materials = data
          })
        } else {
          this.afs.collection('materials',ref => ref.orderBy('date','asc')).valueChanges({idField:'docid'}).subscribe((data)=>{
            this.materials = data
          })
        }

      })
})
  }

  iconify(file_type: any) {
    switch (file_type) {
      case 'Document':return 'book';


      case 'Audio':return 'volume-mute';


      case 'Image': return 'image';


      case 'Video':return 'videocam';


    }
  }

  goTo(m: any) {

    switch (m.file_type) {
      case 'Document':
        console.log(m.file_type);
        this.gs.setParams(m);
        this.nav.navigateForward('/doc-viewer');
            break;

      case'Video':
        this.gs.setParams(m);
        this.nav.navigateForward('/video-player');
        break;

      case 'Audio':
        this.gs.setParams(m);
        this.nav.navigateForward('/audio-player');
        break;

      case 'Image':
        this.gs.setParams(m);
        this.nav.navigateForward('/image-viewer');
        break
    }
    
  }


  delete(m: any) {
    this.afs.collection('materials').doc(m.docid).delete()
  }

  approve(m: any) {
    this.afs.collection('materials').doc(m.docid).update({status:"approved"});
    const data = {
      message:"You file titled "+ m.notes+ " has been approved",
      time:Date.now(),
      uid:m.uid
    };

    this.afs.collection('notifications').add(data).then()
  }

  disapprove(m: any) {
    this.afs.collection('materials').doc(m.docid).update({status:"disapproved"})
  }

  rateUp(m: any) {
    
  }

  rateDown(m: any) {
    
  }
}
