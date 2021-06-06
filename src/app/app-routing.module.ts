import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AngularFireAuthGuard, redirectUnauthorizedTo} from '@angular/fire/auth-guard';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['signin']);

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', loadChildren:'./home/home.module#HomePageModule',  canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectUnauthorizedToLogin } },
  { path: 'signin', loadChildren: './signing/signing.module#SigningPageModule' },
  { path: 'signup', loadChildren: './signup/signup.module#SignupPageModule' },
  { path: 'add', loadChildren: './add/add.module#AddPageModule' },
  { path: 'material', loadChildren: './material/material.module#MaterialPageModule' },
  { path: 'doc-viewer', loadChildren: './doc-viewer/doc-viewer.module#DocViewerPageModule' },
  { path: 'image-viewer', loadChildren: './image-viewer/image-viewer.module#ImageViewerPageModule' },
  { path: 'audio-player', loadChildren: './audio-player/audio-player.module#AudioPlayerPageModule' },
  { path: 'video-player', loadChildren: './video-player/video-player.module#VideoPlayerPageModule' },
  { path: 'inbox', loadChildren: './inbox/inbox.module#InboxPageModule' },
  { path: 'chat/:id', loadChildren: './chat/chat.module#ChatPageModule' },
  { path: 'profile', loadChildren: './profile/profile.module#ProfilePageModule' },
  { path: 'faculties', loadChildren: './faculties/faculties.module#FacultiesPageModule' },
  { path: 'institutions', loadChildren: './institutions/institutions.module#InstitutionsPageModule' },
  { path: 'lecturers/:id', loadChildren: './lectureres/lectureres.module#LectureresPageModule' },
  { path: 'dashboard', loadChildren: './dashboard/dashboard.module#DashboardPageModule' },  { path: 'modules', loadChildren: './modules/modules.module#ModulesPageModule' },
  { path: 'notifications', loadChildren: './notifications/notifications.module#NotificationsPageModule' },













];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
