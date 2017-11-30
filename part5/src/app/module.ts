import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { PokemonDetailComponent } from './components/detail/pokemonDetail';
import { StarWarsDetailComponent } from './components/detail/starWarsDetail';
import { HeaderComponent } from './components/header/header';
import { HomeComponent } from './components/home/home';
import { PokemonListComponent } from './components/list/pokemonList';
import { StarWarsListComponent } from './components/list/starWarsList';
import { MenuComponent } from './components/menu/menu';
import { RootComponent } from './components/root/root';
import { DisplayTextPipe } from './pipes/displayText';
import { ROUTES } from './routes';
import { DesktopIntegrationService } from './services/desktopIntegration';
import { ElectronService } from './services/electron';
import { NotificationService } from './services/notification';
import { PokemonService } from './services/pokemon';
import { ShareService, shareServiceFactory, shareServiceFactoryDeps } from './services/share';
import { StarWarsService } from './services/starWars';
import { WindowRef } from './services/windowRef';

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
    // Careful, this part of code has not been adapted to run with Electron or Cordova (using prod, dev works fine). Only web is currently supported for prod
    environment.production ? ServiceWorkerModule.register('ngsw-worker.js') : [],
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(ROUTES, { useHash: true })
  ],
  bootstrap: [RootComponent],
  providers: [
    WindowRef,
    StarWarsService,
    PokemonService,
    ElectronService,
    DesktopIntegrationService,
    NotificationService,
    {
      provide: ShareService,
      useFactory: shareServiceFactory,
      deps: shareServiceFactoryDeps
    }
  ]
})
export class AppModule {
}
