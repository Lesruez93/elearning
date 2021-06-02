import { Component, OnInit } from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {NavController} from '@ionic/angular';
import {GetterSetterService} from '../getter-setter.service';
import {AngularFireAuth} from '@angular/fire/auth';

@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.page.html',
  styleUrls: ['./inbox.page.scss'],
})
export class InboxPage implements OnInit {
  users: any;
   user: any;
   uid: any;


  constructor( private afs:AngularFirestore,
               private nav:NavController,
               public gs:GetterSetterService,
               private afAuth:AngularFireAuth) { }

  ngOnInit() {
    this.afAuth.authState.subscribe((res:any)=>{
      this.uid = res.uid;
      this.afs.collection('users').doc(res.uid).valueChanges().subscribe((data:any)=>{
        this.user = data;
    this.afs.collection('users',ref => ref.where('role','==','Lecturer')
        .where('department','==',data.department)).valueChanges().subscribe((users)=>{
          this.users = users
    })
  })})}

}
