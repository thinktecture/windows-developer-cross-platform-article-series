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
import {StarWarsListComponent} from './components/list/starWarsList';
import {StarWarsService} from './services/starWars';
import {StarWarsDetailComponent} from './components/detail/starWarsDetail';
import {PokemonListComponent} from './components/list/pokemonList';
import {PokemonDetailComponent} from './components/detail/pokemonDetail';
import {PokemonService} from './services/pokemon';
import {ShareService, shareServiceFactory} from './services/share';

@NgModule({
  declarations: [
    RootComponent,
    HomeComponent,
    HeaderComponent,
    MenuComponent,
    StarWarsListComponent,
    StarWarsDetailComponent,
    PokemonListComponent,
    PokemonDetailComponent
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
    StarWarsService,
    PokemonService,
    {
      provide: ShareService,
      useFactory: shareServiceFactory
    }
  ]
})
export class AppModule {
}
