import {ElectronService} from './electron';
import {Injectable} from '@angular/core';
import {PlatformService, WindowRef} from '@ngx-unicorns/ngx-platform';


export function shareServiceFactory(electronService: ElectronService, platformService: PlatformService, windowRef: WindowRef) {
  if (platformService.isCordovaApplication) {
    return new CordovaShareService(windowRef);
  }

  if (platformService.isElectronApplication) {
    return new ElectronShareService(electronService);
  }

  return new BrowserShareService(windowRef);
}

export const shareServiceFactoryDeps = [ElectronService, PlatformService, WindowRef];

export abstract class ShareService {
  public abstract share(title: string, description: string): Promise<void>;
}

@Injectable()
export class BrowserShareService extends ShareService {
  constructor(private _windowRef: WindowRef) {
    super();
  }

  public share(title: string, description: string): Promise<void> {
    this._windowRef.nativeWindow.open(`mailto:?subject=${title}&body=${encodeURIComponent(description)}`, '_self');
    return Promise.resolve();
  }
}

@Injectable()
export class CordovaShareService extends ShareService {
  constructor(private _windowRef: WindowRef) {
    super();
  }

  public share(title: string, description: string): Promise<void> {
    const options = {
      message: description,
      subject: title
    };

    return new Promise<void>((resolve, reject) => {
      this._windowRef.nativeWindow.plugins.socialsharing.shareWithOptions(options, () => resolve(), err => reject(err));
    });
  }
}

@Injectable()
export class ElectronShareService extends ShareService {
  constructor(private _electronService: ElectronService) {
    super();
  }

  public share(title: string, description: string): Promise<void> {
    if (!this._electronService.electron) {
      return Promise.reject('Electron not available');
    }

    return this._electronService.electron.shell.openExternal(`mailto:?subject=${title}&body=${encodeURIComponent(description)}`)
      ? Promise.resolve()
      : Promise.reject('Opening default mail client failed');
  }
}
