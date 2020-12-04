import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';


import {NgPipesModule} from 'angular-pipes';
import {HomePage} from './home';
import {ShellModule} from '../shell/shell.module';

const routes: Routes = [
  {
    path: '',
    component: HomePage
  }
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        RouterModule.forChild(routes),
        NgPipesModule,
        ShellModule
    ],
  declarations: [HomePage]
})
export class HomePageModule {}
