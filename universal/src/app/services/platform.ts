import {Inject, PLATFORM_ID} from '@angular/core';
import {isPlatformServer} from '@angular/common';

export class PlatformService {
  // Used for startup
  public static isCordovaApplication(): boolean {
    return !global && !!window.cordova;
  }

  constructor(@Inject(PLATFORM_ID) private _platformId: Object) {

  }

  public isBrowserApplication(): boolean {
    return !this.isServerApplication() && !PlatformService.isCordovaApplication();
  }

  public isCordovaApplication(): boolean {
    return !this.isServerApplication() && PlatformService.isCordovaApplication();
  }

  public isElectronApplication(): boolean {
    return !this.isServerApplication() && !!navigator.userAgent.match(/Electron/);
  }

  public isServerApplication(): boolean {
    return isPlatformServer(this._platformId);
  }
}
