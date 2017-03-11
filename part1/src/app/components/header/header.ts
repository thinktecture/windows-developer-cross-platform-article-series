import {Component} from '@angular/core';
import {Location} from '@angular/common';

@Component({
  selector: 'app-header',
  templateUrl: 'header.html',
  styleUrls: ['header.scss']
})
export class HeaderComponent {
    public get isBackChevronVisible(): boolean {
    // Mock implementation, to be extended to only show the button on iOS
    return true;
  }

  constructor(private _location: Location) {
  }

  public goBack() {
    this._location.back();
  }
}
