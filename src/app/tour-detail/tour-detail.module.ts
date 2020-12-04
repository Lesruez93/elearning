import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { TourDetailPage } from './tour-detail.page';

import {NgPipesModule} from 'angular-pipes';

const routes: Routes = [
  {
    path: '',
    component: TourDetailPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),

    NgPipesModule
  ],
  declarations: [TourDetailPage]
})
export class TourDetailPageModule {}
