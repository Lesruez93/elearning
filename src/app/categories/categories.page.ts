import {Component, AfterViewInit, OnInit, Input, ElementRef, ViewChild} from '@angular/core';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.page.html',
  styleUrls: [
    './styles/categories.page.scss',
    './styles/categories.shell.scss',
    './styles/categories.responsive.scss'
  ]
})
export class CategoriesPage implements OnInit, AfterViewInit{

  @Input() src: string;

  @ViewChild('player', {static: false}) playerElementRef: ElementRef;

  isPlaying = false;
  isLoading = false;
  currentTime = 0;
  duration = 0;

 _player: HTMLAudioElement;

  constructor() {
  }

  ngOnInit() {
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
