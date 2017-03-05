import {Routes} from '@angular/router';
import {HomeComponent} from './components/home/home';
import {ListComponent} from './components/list/list';

export const ROUTES: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/home'
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'list/:model/:page',
    component: ListComponent
  }
];
