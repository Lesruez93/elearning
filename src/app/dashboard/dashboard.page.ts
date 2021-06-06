import { Component, OnInit } from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {NavController} from '@ionic/angular';
import {GetterSetterService} from '../getter-setter.service';
import {AngularFireAuth} from '@angular/fire/auth';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  public uid: any;
  public materials: any[];
  public user: any;
  public approved: any;
  public pending: any;
  public dis: any;
  lectures: any;
  public students: any;
  lecturesP: any;

  constructor( public afs:AngularFirestore,
               public nav:NavController,
               public gs:GetterSetterService,
               public afAuth:AngularFireAuth) { }

  ngOnInit() {
    this.afAuth.authState.subscribe((res:any)=>{
      this.uid = res.uid;
      this.afs.collection('users').doc(res.uid).valueChanges({idField:"docicd"}).subscribe((data:any)=>{
        this.user = data;
        if(data.role == 'admin'){
          this.afs.collection('users',ref => ref.where('role','==','Student')).valueChanges({idField:"docicd"}).subscribe((data:any)=>{
            this.students = data.length;
          });
          this.afs.collection('materials',ref => ref.where('status','==','approved')).valueChanges({idField:'docid'}).subscribe((data)=>{
            this.approved = data.length
          });
          this.afs.collection('users',ref => ref.where('role','==','Lecturer').where('status','==','approved')).valueChanges({idField:"docicd"}).subscribe((data:any)=>{
            this.lectures = data.length;
          });

          this.afs.collection('users',ref => ref.where('role','==','Lecturer').where('status','==','pending')).valueChanges({idField:"docicd"}).subscribe((data:any)=>{
            this.lecturesP = data.length;
          });
          this.afs.collection('materials',ref => ref.where('status','==','disapproved')).valueChanges({idField:'docid'}).subscribe((data)=>{
            this.dis = data.length
          });

          this.afs.collection('materials',ref => ref.where('status','==','pending')).valueChanges({idField:'docid'}).subscribe((data)=>{
            this.pending = data.length
          })


        }

        if (data.role == 'Lecturer'){
          this.afs.collection('materials',ref => ref.where('department','==',data.department).orderBy('date','asc')).valueChanges({idField:'docid'}).subscribe((data)=>{
            this.materials = data
          });
          this.afs.collection('users',ref => ref.where('role','==','Student').where('department','==',data.department)).valueChanges({idField:"docicd"}).subscribe((data:any)=>{
            this.students = data.length;
          });
          this.afs.collection('materials',ref => ref.where('status','==','approved').where('uid','==',this.uid)).valueChanges({idField:'docid'}).subscribe((data)=>{
            this.approved = data.length
          });

          this.afs.collection('materials',ref => ref.where('status','==','approved').where('department','==',this.user.department)).valueChanges({idField:'docid'}).subscribe((data)=>{
            this.approved = data.length
          });
          this.afs.collection('materials',ref => ref.where('status','==','disapproved').where('uid','==',this.uid)).valueChanges({idField:'docid'}).subscribe((data)=>{
            this.dis = data.length
          });

          this.afs.collection('materials',ref => ref.where('status','==','pending').where('uid','==',this.uid)).valueChanges({idField:'docid'}).subscribe((data)=>{
            this.pending = data.length
          })
        }});







    })
  }

}
