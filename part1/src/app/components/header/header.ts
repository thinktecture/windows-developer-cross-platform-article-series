import {Component} from '@angular/core';
import {Location} from '@angular/common';
import {PlatformService} from '../../services/platform';

@Component({
  selector: 'app-header',
  templateUrl: 'header.html',
  styleUrls: ['header.scss']
})
export class HeaderComponent {
    public get isBackChevronVisible(): boolean {
    // Mock implementation, to be extended to only show the button on iOS
    return this._location.path() !== '/home' && this._platform.isIOS;
  }

  constructor(private _location: Location, private _platform: PlatformService) {
  }

  public goBack() {
    this._location.back();
  }
}
