import { Component, OnInit } from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {NavController} from '@ionic/angular';
import {GetterSetterService} from '../getter-setter.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-lectureres',
  templateUrl: './lectureres.page.html',
  styleUrls: ['./lectureres.page.scss'],
})
export class LectureresPage implements OnInit {
 users: any;

  constructor(
      public afs:AngularFirestore,
      public nav:NavController,
      public gs:GetterSetterService,
      private route:ActivatedRoute,
  ) { }

  ngOnInit() {
    this.afs.collection('users',ref => ref.where('role','==','Lecturer').where('status','==',this.route.snapshot.paramMap.get('id'))).valueChanges({idField:"docid"}).subscribe((data:any)=>{
      this.users = data;
    });



  }
    delete(m: any) {
        this.afs.collection('users').doc(m.docid).delete()
    }

    approve(m: any) {
        this.afs.collection('users').doc(m.docid).update({status:"approved"});
        const data = {
            message:"Your reg  has been approved",
            time:Date.now(),
            uid:m.uid
        };

        this.afs.collection('notifications').add(data).then()
    }

    disapprove(m: any) {
        this.afs.collection('users').doc(m.docid).update({status:"disapproved"})
    }
}
