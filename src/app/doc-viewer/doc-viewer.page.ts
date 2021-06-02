import { Component, OnInit } from '@angular/core';
import {GetterSetterService} from '../getter-setter.service';
import {MenuController} from '@ionic/angular';

@Component({
  selector: 'app-doc-viewer',
  templateUrl: './doc-viewer.page.html',
  styleUrls: ['./doc-viewer.page.scss'],
})
export class DocViewerPage implements OnInit {

  constructor(public gs:GetterSetterService,
              private menu: MenuController
              ) { }

  ngOnInit() {
    this.menu.enable(false)

  }
  ionViewWillLeave() {
    this.menu.enable(true)
  }
}
