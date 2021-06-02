import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { DocViewerPage } from './doc-viewer.page';
import {NgxDocViewerModule} from 'ngx-doc-viewer';

const routes: Routes = [
  {
    path: '',
    component: DocViewerPage
  }
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        RouterModule.forChild(routes),
        NgxDocViewerModule
    ],
  declarations: [DocViewerPage]
})
export class DocViewerPageModule {}
