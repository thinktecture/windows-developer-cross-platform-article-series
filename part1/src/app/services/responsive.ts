import {WindowRef} from './windowRef';
import {Injectable} from '@angular/core';

@Injectable()
export class ResponsiveService {
  // As defined by include-media
  private _breakpoints = {
    phone: 320,
    tablet: 768,
    desktop: 1024
  };

  public get isTablet(): boolean {
    return this._windowRef.nativeWindow.innerWidth > this._breakpoints.tablet
      && this._windowRef.nativeWindow.innerWidth <= this._breakpoints.tablet;
  }

  public get isDesktop(): boolean {
    return this._windowRef.nativeWindow.innerWidth > this._breakpoints.desktop;
  }

  public get isPhone(): boolean {
    return this._windowRef.nativeWindow.innerWidth <= this._breakpoints.tablet;
  }

  constructor(private _windowRef: WindowRef) {
  }
}
