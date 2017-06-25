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
import {StarWarsListComponent} from './components/list/starWarsList';
import {StarWarsService} from './services/starWars';
import {StarWarsDetailComponent} from './components/detail/starWarsDetail';
import {PokemonListComponent} from './components/list/pokemonList';
import {PokemonDetailComponent} from './components/detail/pokemonDetail';
import {PokemonService} from './services/pokemon';
import {ShareService, shareServiceFactory, shareServiceFactoryDeps} from './services/share';
import {DisplayTextPipe} from './pipes/displayText';
import {DesktopIntegrationService} from './services/desktopIntegration';
import {ElectronService} from './services/electron';
import {SeoService} from './services/seo';
import {PlatformModule} from '@ngx-unicorns/ngx-platform';

@NgModule({
  declarations: [
    RootComponent,
    HomeComponent,
    HeaderComponent,
    MenuComponent,
    StarWarsListComponent,
    StarWarsDetailComponent,
    PokemonListComponent,
    PokemonDetailComponent,
    DisplayTextPipe
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'windev-universal' }),
    FormsModule,
    HttpModule,
    RouterModule.forRoot(ROUTES),
    PlatformModule.forRoot()
  ],
  bootstrap: [RootComponent],
  providers: [
    StarWarsService,
    PokemonService,
    ElectronService,
    DesktopIntegrationService,
    SeoService,
    {
      provide: ShareService,
      useFactory: shareServiceFactory,
      deps: shareServiceFactoryDeps
    }
  ]
})
export class AppModule {
}
