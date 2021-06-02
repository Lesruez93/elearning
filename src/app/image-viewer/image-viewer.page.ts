import { Component, OnInit } from '@angular/core';
import {GetterSetterService} from '../getter-setter.service';

@Component({
  selector: 'app-image-viewer',
  templateUrl: './image-viewer.page.html',
  styleUrls: ['./image-viewer.page.scss'],
})
export class ImageViewerPage implements OnInit {
    images:  any = [];

  constructor(public gs:GetterSetterService) { }

  ngOnInit() {

    this.images.push(this.gs.getParams().file)
  }

}
