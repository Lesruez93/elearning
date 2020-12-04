import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {GetterSetterService} from '../getter-setter.service';
import {NavController} from '@ionic/angular';

@Component({
  selector: 'app-player',
  templateUrl: './player.page.html',
  styleUrls: ['./player.page.scss'],
})
export class PlayerPage implements OnInit {

  data: any;
  @ViewChild('player', {static: false}) playerElementRef: ElementRef;

  isPlaying = false;
  isLoading = false;
  currentTime = 0;
  duration = 0;

  _player: HTMLAudioElement;
  constructor(

      private gs:GetterSetterService,
      private router:NavController,
      public navCtrl:NavController
  ) {


    this.data = gs.getParams()
  }

  ngOnInit() {
  }

  home() {
    this.router.navigateRoot('app/home')

  }


  ngAfterViewInit(): void {
    this._player = this.playerElementRef.nativeElement;
    this._bindPlayerEvents();
  }

  play(): void {
    this._player.paused ? this._player.play() : this._player.pause();
  }

  seek({ detail: { value } }: { detail: { value: number } }): void {
    this._player.currentTime = value;
  }

  seek_(): void {
    this._player.currentTime = +10;
  }
  private _bindPlayerEvents(): void {
    this._player.addEventListener('playing', () => {
      this.isPlaying = true;
    });

    this._player.addEventListener('pause', () => {
      this.isPlaying = false;
    });

    this._player.addEventListener('timeupdate', () => {
      this.currentTime = Math.floor(this._player.currentTime);
    });


    this._player.addEventListener('loadstart', () => {
      this.isLoading = true;
    });

    this._player.addEventListener('loadeddata', () => {
      this.isLoading = false;
      this.duration = Math.floor(this._player.duration);
    });
  }

  search() {
    this.navCtrl.navigateRoot('app/search')
  }

  discover() {
    this.navCtrl.navigateRoot('app/discover')

  }

  library() {
    this.navCtrl.navigateRoot('app/library')

  }
}
