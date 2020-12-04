import {AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {GetterSetterService} from '../getter-setter.service';
import {Router} from '@angular/router';
import {NavController} from '@ionic/angular';
import {PlayerService} from '../player.service';

@Component({
  selector: 'app-tour-detail',
  templateUrl: './tour-detail.page.html',
  styleUrls: ['./tour-detail.page.scss'],
})
export class TourDetailPage implements OnInit, AfterViewInit {
   data: any;

  isPlaying = false;
  currentTime = 0;
  duration = 0;
    @Input() src: string;

    @ViewChild('player', {static: false}) playerElementRef: ElementRef;

    isLoading = false;


    _player: HTMLAudioElement;

  constructor(

      private gs:GetterSetterService,
      private router:NavController,
      private playerS:PlayerService,
      public navCtrl:NavController
  ) {


    this.data = gs.getParams()
  }

  ngOnInit() {
  }

  home() {
    this.router.navigateRoot('app/home')

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





    ngAfterViewInit(): void {
        this._player = this.playerElementRef.nativeElement;
        this._bindPlayerEvents();
    }

    play(): void {
        this._player.paused ? this._player.play() : this._player.pause();
    }

    seek({detail: {value}}: { detail: { value: number } }): void {
        this._player.currentTime = value;
    }

    private _bindPlayerEvents(): void {
        this._player.addEventListener('playing', () => {
            this.isPlaying = true;
            this.playerS.playFile()
            console.log('isPlaying')

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
}
