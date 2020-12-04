import {AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {GetterSetterService} from '../getter-setter.service';
import {Router} from '@angular/router';
import {Howl, Howler} from 'howler';
import {PlayerService} from '../player.service';

@Component({
  selector: 'app-library',
  templateUrl: './library.page.html',
  styleUrls: ['./library.page.scss'],
})
export class LibraryPage implements OnInit, AfterViewInit {
 data: any;
  @Input() src: string;

  @ViewChild('player', {static: false}) playerElementRef: ElementRef;

  isPlaying = false;
  isLoading = false;
  currentTime = 0;
  duration = 0;

 _player: HTMLAudioElement;
    file: any;

  constructor(
      private http:HttpClient,
      private gs:GetterSetterService,
      private player:PlayerService,
      public router:Router,

  ) { }

  ngOnInit() {
  this.loadData()
  }

  ngAfterViewInit(): void {

  }






    pause(file) {
       this.player.pause(file);
        this.file = null
    }

   async  doRefresh(event) {
this.src = null
this.loadData()
        setTimeout(() => {

            console.log('Async operation has ended');
            event.target.complete();
        }, 3000);
    }

    loadData(){
        this.http.get('https://portal.audioguide-namibia.com/get-items-list/').subscribe((res:any)=> {
            // this.data  = res.items
            this.data  = res.items
        })

    }

    goToDetail(item: any) {
        this.gs.setParams(item)
        this.router.navigateByUrl('/tour-detail')

    }

    howPlay(sound, i){
        this.file = sound.audiofile;
       this.player.howPlay(sound)

  }
}
