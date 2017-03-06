import {Routes} from '@angular/router';
import {HomeComponent} from './components/home/home';
import {ListComponent} from './components/list/list';
import {DetailComponent} from './components/detail/detail';

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
  },
  {
    path: 'detail/:model/:id',
    component: DetailComponent
  }
];
