import {Injectable} from '@angular/core';
import {MusicControls} from '@ionic-native/music-controls/ngx';
import {Media, MediaObject} from '@ionic-native/media/ngx';
import {LoadingController} from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

    private status: any;
    private position: number;
    private mediaFile: MediaObject;
    private loading: HTMLIonLoadingElement;
    private positionInterval: NodeJS.Timeout;
    private file: any;

  constructor(
      private  musicControls: MusicControls,
      private loader:LoadingController,
      private media: Media
  ) {



  }

         async howPlay(odj) {
      clearInterval(this.positionInterval);
      this.presentLoader();
      this.getPosition();
      this.controls(odj.title,odj.imagefile);
                if (this.status == 3) {
                    if (this.position > 1){
if (this.file == odj.title){
    this.mediaFile.play()

} else {
    this.playFile().then(()=>{
        this.mediaFile = this.media.create(odj.audiofile);
        this.mediaFile.play();
        this.mediaFile.onStatusUpdate.subscribe(status => {
            console.log(status);
            this.status  = status})
    });
}
                    }
                    else {
                        this.playFile().then(()=>{
                            this.mediaFile = this.media.create(odj.audiofile);
                            this.mediaFile.play();
                            this.mediaFile.onStatusUpdate.subscribe(status => {
                                console.log(status);
                                this.status  = status})
                        });
                    }

                }
                else if (this.status == 2) {

          await          this.playFile().then(()=>{
                        this.mediaFile = this.media.create(odj.audiofile);
                        this.mediaFile.play();
                        this.mediaFile.onStatusUpdate.subscribe(status => {
                            console.log(status);
                            this.status  = status
                        });
                    })


                }
                else {
                    this.mediaFile = this.media.create(odj.audiofile);
                    this.mediaFile.play();
                    this.mediaFile.onStatusUpdate.subscribe(status => {
                        console.log(status);
                        this.status  = status
                    });

                }

            }
async playFile(){
   await this.mediaFile.stop();
    await  this.mediaFile.release()
    this.musicControls.destroy()
  }


 private  controls( title,image){
    this.musicControls.create({
      track       : title,        // optional, default : ''
                        // optional, default : ''
      cover       : image,      // optional, default : nothing
      isPlaying   : true,                         // optional, default : true
      dismissable : true,
        hasPrev   : false,      // show previous button, optional, default: true
        hasNext   : false,      // show next button, optional, default: true
        hasClose  : true,
        hasSkipForward : true,  // show skip forward button, optional, default: false
        hasSkipBackward : true,
        skipForwardInterval: 15, // display number for skip forward, optional, default: 0
        skipBackwardInterval: 15, // display number for skip backward, optional, default: 0

        // optional, default : false
    });


     this.musicControls.subscribe().subscribe(action => {
             console.log(action)

             const message = JSON.parse(action).message;
             switch(message) {
                 case 'music-controls-next':
                     console.log('next')
                     break;
                 case 'music-controls-previous':
                     // Do something
                     break;
                 case 'music-controls-pause':
                     this.pause(title)
                     this.musicControls.updateIsPlaying(false);
                     this.musicControls.updateDismissable(false)

                     break;
                 case 'music-controls-play':
                     if (this.status == 3) {
                         this.mediaFile.play()
                     }
                     this.musicControls.updateIsPlaying(true);
                     this.musicControls.updateDismissable(true)
                     break;
                 case 'music-controls-destroy':

                     this.playFile()
                     break;

                 // External controls (iOS only)
                 case 'music-controls-toggle-play-pause' :
                     // Do something
                     break;
                 case 'music-controls-seek-to':
                     const seekToInSeconds = JSON.parse(action).position;
                     this.musicControls.updateElapsed({
                         elapsed: seekToInSeconds,
                         isPlaying: true
                     });
                     // Do something
                     break;
                 case 'music-controls-skip-forward':
                   this.seekF(10000)

                     break;
                 case 'music-controls-skip-backward':
                     // Do something
                     this.seekF(-10000)
                     break;

                 // Headset events (Android only)
                 // All media button events are listed below
                 case 'music-controls-media-button' :
                     // Do something
                     break;


                 case 'music-controls-media-button-play-pause':
                     this.pause(title)
                     break
                 case 'music-controls-headset-unplugged':
                     // Do something
                     break;
                 case 'music-controls-headset-plugged':
                     // Do something
                     break;
                 default:
                     break;
             }
         }
     );

     this.musicControls.listen(); // activates the observable above


     this.musicControls.updateIsPlaying(true);

 }
    
 getPosition(){
      this.positionInterval = setInterval(()=>{

          this.mediaFile.getCurrentPosition()

              .then((position:number)=>{
              this.position = position;
              console.log(position);
              if (position > 1 ){
                  this.dismiss()
              }
          })
      },1000)

}

  private  next(s,i) {
    //this.sound.seek(s[i+1],this.id)

  }

   async pause(file) {
      this.file = file
    await this.mediaFile.pause();
       clearInterval(this.positionInterval)
  }

  async presentLoader(){
        this.loading = await this.loader.create({

            mode:'ios'
      })

      await this.loading.present()
  }

 async dismiss(){
     await this.loading.dismiss()
  }

    seekF(number: number) {
        this.mediaFile.seekTo(number)
    }
}

