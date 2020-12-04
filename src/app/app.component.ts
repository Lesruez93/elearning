import { Component } from '@angular/core';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import {Platform} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: [

  ]
})
export class AppComponent {


  textDir = 'ltr';

  constructor(public translate: TranslateService,
              private splashScreen:SplashScreen,
              private platform:Platform,
              private statusbar: StatusBar,

  ) {
    this.initializeApp();
    this.setLanguage();
  }

  async initializeApp() {
    this.platform.ready()
        .then(()=>{

          this.splashScreen.hide()
          this.statusbar.backgroundColorByHexString("#e9c46b")









        })
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
