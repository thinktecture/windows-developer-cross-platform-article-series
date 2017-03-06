import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

import {RootComponent} from './components/root/root';
import {RouterModule} from '@angular/router';
import {ROUTES} from './routes';
import {HomeComponent} from './components/home/home';
import {HeaderComponent} from './components/header/header';
import {MenuComponent} from './components/menu/menu';
import {WindowRef} from './services/windowRef';
import {ListComponent} from './components/list/list';
import {StarWarsService} from './services/starWars';
import {DetailComponent} from './components/detail/detail';

@NgModule({
  declarations: [
    RootComponent,
    HomeComponent,
    HeaderComponent,
    MenuComponent,
    ListComponent,
    DetailComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(ROUTES, { useHash: true })
  ],
  bootstrap: [RootComponent],
  providers: [
    WindowRef,
    StarWarsService
  ]
})
export class AppModule {
}
