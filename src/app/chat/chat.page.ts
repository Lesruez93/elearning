import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {AngularFirestore} from '@angular/fire/firestore';
import {NavController} from '@ionic/angular';
import {GetterSetterService} from '../getter-setter.service';
import {AngularFireAuth} from '@angular/fire/auth';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {
   id: string;
   uid: any;
   data: any;
  message: any;
  msgs: any;
  user: any;

  constructor(private route:ActivatedRoute,
              private afs:AngularFirestore,
        private nav:NavController,
        public gs:GetterSetterService,
        private afAuth:AngularFireAuth,) { }

    ngOnInit() {
      this.afAuth.authState.subscribe((res:any)=> {
        this.uid = res.uid;
        this.afs.collection('users').doc(res.uid).valueChanges().subscribe((user)=>{
          this.user = user
        })
      });
    this.id = this.route.snapshot.paramMap.get('id');
      this.afs.collection('chat').doc(this.id).collection('inbox',ref => ref.orderBy('id','asc')).valueChanges().subscribe((data)=>{
        this.msgs = data
      })
  }
  addocument() {










      this.data = {
        message: this.message,
        name: this.user.name,
        uid: this.uid,
        users: {[this.uid]: true, [this.id]: true},
        userss: [this.uid, this.id],
        id: Date.now(),
        user_id: this.id,


      };


      //  console.log("rererre",res.id);
      this.afs.collection("chat").doc(this.id)
          .collection('inbox').add(this.data)
          .then((res) => {


            this.message = '';


            this.scrollToBottomOnInit()
          }).catch((error: any) => {


      });





  }


  scrollToBottomOnInit() {
    // if (this.content.scrollToBottom) {
    //     this.content.scrollToBottom(400);
    // }
  }

 

  
  // async options(id) {
  //   if (id.uid == this.uid){
  //
  //
  //     const actionsheet = await this.actionsheetCtrl.create({
  //       header: this.ctrl.translatetxt('option'),
  //       buttons: [
  //
  //
  //         {
  //           text: this.ctrl.translatetxt('delete'),
  //           icon:  'trash',
  //           handler: () => {
  //             this.afs.collection("chat").doc(this.docid).collection('inbox').doc(id.docid).delete()
  //
  //
  //
  //
  //
  //           }
  //         },
  //
  //         {
  //           text: this.ctrl.translatetxt('cancel'),
  //           icon: 'close',
  //           role: 'destructive',
  //           handler: () => {
  //
  //           }
  //         }
  //       ]
  //     });
  //     await actionsheet.present();
  //
  //   }
  // }
  user_profile() {

  }


  onFocus() {

  }
}
