import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import {AgmCoreModule} from '@agm/core';
import {MapPage} from './map.page';

const routes: Routes = [
  {
    path: '',
    component: MapPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    AgmCoreModule.forRoot({

      apiKey: 'AIzaSyCUJ1n1KTJHDaDdVmpY686z8AAle8GAbQQ',
      libraries: ['places', 'drawing', 'geometry'],
    })
  ],

  declarations: [MapPage]
})
export class MapPageModule {}
