import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

import {AlertController, NavController} from '@ionic/angular';
import {GetterSetterService} from '../getter-setter.service';
import {AngularFirestore} from '@angular/fire/firestore';
import {AngularFireAuth} from '@angular/fire/auth';

@Component({
  selector: 'app-home',
  templateUrl: './home.html',
  styleUrls: [
    './styles/home.page.scss',
    './styles/home.shell.scss',
    './styles/home.ios.scss',
    './styles/home.md.scss'
  ],
})
export class HomePage implements OnInit {



    data: any = [{image:'book',text:'Materials',page:'/material'},
        {image:'add',text:'Add material',page:'/add'},
    ];



    private lat: number;
    private lon: number;
    user: any;
    private uid: any;


    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private navCtrl: NavController,
        private getter: GetterSetterService,
        private afs:AngularFirestore,
        public gs:GetterSetterService,
        private afAuth:AngularFireAuth,
        private alert:AlertController,
    ) {

    }



    ngOnInit(): void {
        this.afAuth.authState.subscribe((res:any)=>{
            this.uid = res.uid;
            this.afs.collection('users').doc(res.uid).valueChanges().subscribe((data:any)=>{
                this.user = data;

    })})}

    al() {
        //  alert('da')
    }


   async add() {
        if (this.user.status != 'approved'){
            const  a = await this.alert.create({
                message:"You cant add  an ebook. your registration is awaiting approval",
                header:"Error",
                buttons: ['OK']
            });


            await  a.present()
        }
    }
}
