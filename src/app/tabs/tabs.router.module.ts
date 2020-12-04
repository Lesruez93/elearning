import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'home',
        children: [
          {
            path: '',
            loadChildren: () => import('../home/home.module').then(m => m.HomePageModule)
          },
       
        ]
      },
      {
        path: 'search',
        children: [
          {
            path: '',
            loadChildren: () => import('../search/search.module').then(m => m.SearchPageModule)

          },

        ]
      },
      {
        path: 'discover',
        children: [
          {
            path: '',
            loadChildren: () => import('../discover/discover.module').then(m => m.DiscoverPageModule)
          },

        ]
      },
      {
        path: 'library',
        children: [
          { path: '',
            loadChildren: () => import('../library/library.module').then(m => m.LibraryPageModule)
          },

        ]
      },
    ]
  },
  // /app/ redirect
  {
    path: '',
    redirectTo: 'app/tabs',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes), HttpClientModule],
  exports: [RouterModule],
  providers: [ ]
})
export class TabsPageRoutingModule {}
