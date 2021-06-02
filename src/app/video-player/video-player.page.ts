import { Component, OnInit } from '@angular/core';
import {GetterSetterService} from '../getter-setter.service';

@Component({
  selector: 'app-video-player',
  templateUrl: './video-player.page.html',
  styleUrls: ['./video-player.page.scss'],
})
export class VideoPlayerPage implements OnInit {
  constructor(public gs:GetterSetterService) { }

  ngOnInit() {


  }

}
