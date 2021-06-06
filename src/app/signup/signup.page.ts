import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {LoadingController, MenuController, ToastController} from '@ionic/angular';
import {Router} from '@angular/router';
import {AngularFireAuth} from '@angular/fire/auth';
import {AngularFirestore} from '@angular/fire/firestore';
import {finalize} from 'rxjs/operators';
import {AngularFireStorage} from '@angular/fire/storage';
import {Observable, Subscription} from 'rxjs';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  dpts: any = ['IT',"History"];

  password: any;
  email: any;

  private loading: any;
  department: any;
  name: any;
  role: any;
  roles: any = ['Lecturer','Student'];
  facs: any;
 insts: any;
    inst: any;
    private uploadPercent: Observable<number | undefined>;
    private downloadURL: Observable<any>;
    private upload: Subscription;
    private idDocument: any;
    ec_number: any;
    private data: any;
    private level: any;
    levels: any = ["1.1","1.2","2.2","2.2","3.1","3.2","4.1","4.2"];
  constructor(
      private http:HttpClient,
      private loadingCtrl:LoadingController,
      private toastCtrl:ToastController,
      private router:Router,
      private afs:AngularFirestore,
      private afAuth:AngularFireAuth,
    private menu: MenuController,
      private storage:AngularFireStorage,
  ) { }

  ngOnInit() {
      this.menu.enable(false)
      this.afs.collection("insts").valueChanges({idField:"docid"}).subscribe((res:any)=>{
          this.insts = res
      });
      this.afs.collection("facs").valueChanges({idField:"docid"}).subscribe((res:any)=>{
          this.facs = res
      })
  }

 async submit() {
      if (this.role == 'Lecturer'){
          if (this.ec_number && this.idDocument){
              if (this.email && this.password && this.name && this.department && this.role){




                  const loading =  await this.loadingCtrl.create({
                      message:'Submitting'
                  });
                  await  loading.present();


                  this.afAuth.createUserWithEmailAndPassword(this.email,this.password).then(res=>{

                      if (this.role == 'Lecturer'){
                          this.data ={
                              email:this.email,
                              department:this.department,
                              name:this.name,
                              inst:this.inst,
                              status:'pending',
                              uid:res.user.uid,
                              ec_number:this.ec_number,
                              idDocument:this.idDocument,
                              role:this.role,


                          };
                      }
                      else {
                          this.data ={
                              email:this.email,
                              department:this.department,
                              name:this.name,
                              inst:this.inst,
                              uid:res.user.uid,
                              role:this.role,


                          };
                      }



                      this.dismiss().catch();
                      this.afs.collection('users').doc(res.user.uid).set(this.data).then(()=>{
                          this.toast("Registration Successful",'success').then().catch();
                          loading.dismiss();
                          this.router.navigate(['./'])
                      }).catch(()=>{
                          this.toast("Something went wrong please try again",'danger').then().catch();
                          loading.dismiss();
                      })
                  },error1 => {

                      this.toast(error1.message,'danger').then().catch();
                      loading.dismiss()



                  })
              }else {
                  this.toast('All fields are  required','danger')

              }

          }
          else {
              this.toast('All fields are required','danger')
          }
      }
      else  if (this.email && this.password && this.name && this.department && this.role){

          const loading =  await this.loadingCtrl.create({
              message:'Submitting'
          });
          await  loading.present();


          this.afAuth.createUserWithEmailAndPassword(this.email,this.password).then(res=>{

              if (this.role == 'Lecturer'){
                  this.data ={
                      email:this.email,
                      department:this.department,
                      name:this.name,
                      inst:this.inst,
                      uid:res.user.uid,
                      ec_number:this.ec_number,
                      idDocument:this.idDocument,
                      role:this.role,


                  };
              }
              else {
                  this.data ={
                      email:this.email,
                      department:this.department,
                      name:this.name,
                      inst:this.inst,
                      level:this.level,
                      uid:res.user.uid,
                      role:this.role,


                  };
              }



              this.dismiss().catch();
              this.afs.collection('users').doc(res.user.uid).set(this.data).then(()=>{
                  this.toast("Registration Successful",'success').then().catch();
                  loading.dismiss();
                  if(this.role == "Lecture"){
                      const data = {
                          message:"New Lecture signup",
                          page:"lectures",
                          time:Date.now(),
                          uid:"wxZICzTTiyQI3H5YovXEpbKLbvk1"
                      };

                      this.afs.collection('notifications').add(data).then()
                  }
                  this.router.navigate(['./'])
              }).catch(()=>{
                  this.toast("Something went wrong please try again",'danger').then().catch();
                  loading.dismiss();
              })
          },error1 => {

              this.toast(error1.message,'danger').then().catch();
              loading.dismiss()



          })
      }else {
          this.toast('All fields are  required','danger')

      }


  }

  async loader(){

  }

async  dismiss()
  {
     if (this.loading){
   await    this.loading.dismiss().catch()
     }

  }

  async toast(msg,color){
    const toast = await this.toastCtrl.create({
      message:msg,
      duration:3000,
      position:'top',
      color:color
    });
    await toast.present()
  }
    ionViewWillLeave() {
        this.menu.enable(true)
    }


    async uploadFile(event) {


        const loading = await this.loadingCtrl.create({
            message:'Uploading....  ',
            duration:10000
        });
        await loading.present();


        const file = event.target.files[0];
        const filePath = Date.now().toString();
        const fileRef = this.storage.ref(filePath);
        const task = this.storage.upload(filePath, file);

        // observe percentage changes
        this.uploadPercent = task.percentageChanges();
        // get notified when the download URL is available
      //  this.getCancelButton = false;

        this.upload =  task.snapshotChanges().pipe(
            finalize(() =>
                {
                    this.downloadURL = fileRef.getDownloadURL();
                    fileRef.getDownloadURL().subscribe(x=>{console.log(x);
                        this.idDocument = x;
                        loading.dismiss();

                    });
                }
            ))
            .subscribe()


    }
}
