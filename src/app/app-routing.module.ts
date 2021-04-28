import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: '/welcome', pathMatch: 'full' },
  { path: 'app', loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule) },
  { path: 'welcome', loadChildren: () => import('./categories/categories.module').then(m => m.CategoriesPageModule) },
  { path: 'home', loadChildren: () => import('./home/home.module').then(m => m.HomePageModule) },
  { path: 'tour-detail', loadChildren: './tour-detail/tour-detail.module#TourDetailPageModule' },
  { path: 'library', loadChildren: './library/library.module#LibraryPageModule' },
  { path: 'discover', loadChildren: './discover/discover.module#DiscoverPageModule' },
  { path: 'search', loadChildren: './search/search.module#SearchPageModule' },
  { path: 'player', loadChildren: './player/player.module#PlayerPageModule' },
  { path: 'map', loadChildren: './map/map.module#MapPageModule' },





];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
