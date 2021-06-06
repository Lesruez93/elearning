import {Component} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {NavController, Platform} from '@ionic/angular';
import {AngularFirestore} from '@angular/fire/firestore';
import {AngularFireAuth} from '@angular/fire/auth';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: [

  ]
})
export class AppComponent {


  textDir = 'ltr';
  list = [
    {name: 'Home', icon: 'home' , route: '/home'},
     // {name:'Dashboard',icon:'apps',route:'/dashboard', admin:true},
    {name: 'Notifications', icon: 'notifications', route: '/notifications'},
    {name: 'Chat', icon: 'chatbubbles', route: '/inbox'},
    {name: 'Profile', icon: 'person', route: '/profile'},
    // {name:'Modules',icon:'book',route:'/modules', admin:true},
    // {name:'Faculties',icon:'book',route:'/faculties', admin:true},
    // {name:'Institutions',icon:'school',route:'/institutions', admin:true},
    // {name: 'Logout', icon: 'power' , route: '/signin'},

  ];
  private uid: any;
  private user: any;


  constructor(public translate: TranslateService,
              private afs:AngularFirestore,
              private nav:NavController,
              private afAuth:AngularFireAuth,
              private platform: Platform,


  ) {
    this.afAuth.authState.subscribe((res:any)=>{
      this.uid = res.uid;
      this.afs.collection('users').doc(res.uid).valueChanges().subscribe((data)=>{
        this.user = data
      })
    });
    this.initializeApp();
    this.setLanguage();
  }

  async initializeApp() {
    this.platform.ready()
        .then(() => {










        });
  }

  setLanguage() {
    // this language will be used as a fallback when a translation isn't found in the current language
    this.translate.setDefaultLang('en');

    // the lang to use, if the lang isn't available, it will use the current loader to get them
    this.translate.use('en');

    // this is to determine the text direction depending on the selected language
    // for the purpose of this example we determine that only arabic and hebrew are RTL.
    // this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
    //   this.textDir = (event.lang === 'ar' || event.lang === 'iw') ? 'rtl' : 'ltr';
    // });
  }

}
