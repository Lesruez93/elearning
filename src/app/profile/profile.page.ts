import { Component, OnInit } from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {NavController} from '@ionic/angular';
import {GetterSetterService} from '../getter-setter.service';
import {AngularFireAuth} from '@angular/fire/auth';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  public user: any;
  public uid: any;

  constructor( public afs:AngularFirestore,
               public nav:NavController,
               public gs:GetterSetterService,
               public afAuth:AngularFireAuth) { }

  ngOnInit() {

    this.afAuth.authState.subscribe((res:any)=>{
      this.uid = res.uid;
      this.afs.collection('users').doc(res.uid).valueChanges({idField:"docicd"}).subscribe((data:any)=>{
        this.user = data;
  }
      )})}

    delete() {

    }
}
