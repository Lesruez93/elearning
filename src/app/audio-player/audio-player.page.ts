import { Component, OnInit } from '@angular/core';
import {GetterSetterService} from '../getter-setter.service';

@Component({
  selector: 'app-audio-player',
  templateUrl: './audio-player.page.html',
  styleUrls: ['./audio-player.page.scss'],
})
export class AudioPlayerPage implements OnInit {

  constructor( public gs:GetterSetterService) { }

  ngOnInit() {
  }

}
