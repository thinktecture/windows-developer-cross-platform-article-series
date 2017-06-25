import {Injectable, NgZone} from '@angular/core';
import {Router} from '@angular/router';
import {PlatformService} from './platform';
import {ElectronService} from './electron';

// TODO: Split into multiple services?

@Injectable()
export class DesktopIntegrationService {
  constructor(private _router: Router, private _electronService: ElectronService, private _zone: NgZone) {
  }

  public integrate() {
    if (!PlatformService.isElectronApplication()) {
      return;
    }

    this._electronService.electron.ipcRenderer.on('navigateTo', (event, data) => {
      this._zone.run(() => {
        this._handleNavigateTo(data);
      });
    });
  }

  private _handleNavigateTo(data) {
    switch (data) {
      case 'starwars-people':
        this._router.navigate(['/starwars/list/people/1']);
        break;
      case 'starwars-planets':
        this._router.navigate(['/starwars/list/people/1']);
        break;
      case 'pokemon-list':
        this._router.navigate(['/pokemon/list/pokemon/1']);
        break;
    }
  }
}
