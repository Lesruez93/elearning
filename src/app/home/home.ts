import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

import {AlertController, NavController} from '@ionic/angular';

import {TranslateService} from '@ngx-translate/core';
import {HttpClient} from '@angular/common/http';
import {GetterSetterService} from '../getter-setter.service';

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
    ngOnInit(): void {

    }


    data: any = [{image:'./assets/images/icon.png',text:'Report',page:'/report'},
        {image:'./assets/images/about.png',text:'About',page:'/about'},
        {image:'./assets/images/where.png',text:'Where to report',page:'/about'},
        {image:'./assets/images/question.png',text:'Ask',page:'/about'}];

    private lat: number;
    private lon: number;


    constructor(
        private route: ActivatedRoute,
        public translate: TranslateService,
        private router: Router,
        private navCtrl: NavController,
        private getter: GetterSetterService,
        public alertController: AlertController,
        private http: HttpClient,
    ) {

    }





    al() {
        //  alert('da')
    }

    openDetail(value) {
        this.getter.setParams(value)
        this.router.navigateByUrl('/tour-detail')
    }

}
