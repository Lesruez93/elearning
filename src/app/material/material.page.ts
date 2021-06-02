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

  constructor( private afs:AngularFirestore,
               private nav:NavController,
               public gs:GetterSetterService,
               private afAuth:AngularFireAuth) { }

  ngOnInit() {
    this.afAuth.authState.subscribe((res:any)=>{
      this.uid = res.uid;
      this.afs.collection('users').doc(res.uid).valueChanges({idField:"docicd"}).subscribe((data:any)=>{
       this.afs.collection('materials',ref => ref.where('department','==',data.department).orderBy('date','asc')).valueChanges().subscribe((data)=>{
         this.materials = data
       })})
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
}
