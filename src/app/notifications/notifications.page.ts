import { Component, OnInit } from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {NavController} from '@ionic/angular';
import {AngularFireAuth} from '@angular/fire/auth';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.page.html',
  styleUrls: ['./notifications.page.scss'],
})
export class NotificationsPage implements OnInit {
    notifications: any;
  private uid: any;

  constructor(  private afs:AngularFirestore,
                private nav:NavController,
                private afAuth:AngularFireAuth,) { }

  ngOnInit() {
    this.afAuth.authState.subscribe((res:any)=>{
      this.uid = res.uid;
      this.afs.collection('notifications',ref => ref.where('uid','==',res.uid)).valueChanges({idField:'docid'}).subscribe((data)=>{
        this.notifications = data
      })
    })
  }

}
