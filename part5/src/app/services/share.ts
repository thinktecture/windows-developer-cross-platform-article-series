import {PlatformService} from './platform';
import {ElectronService} from './electron';
import {Injectable} from '@angular/core';

export function shareServiceFactory(electronService) {
  if (PlatformService.isCordovaApplication()) {
    return new CordovaShareService();
  }

  if (PlatformService.isElectronApplication()) {
    return new ElectronShareService(electronService);
  }

  return new BrowserShareService();
}

export const shareServiceFactoryDeps = [ElectronService];

export abstract class ShareService {
  public abstract share(title: string, description: string): Promise<void>;
}

export class BrowserShareService extends ShareService {
  public share(title: string, description: string): Promise<void> {
    window.open(`mailto:?subject=${title}&body=${encodeURIComponent(description)}`, '_self');
    return Promise.resolve();
  }
}

export class CordovaShareService extends ShareService {
  public share(title: string, description: string): Promise<void> {
    const options = {
      message: description,
      subject: title
    };

    return new Promise<void>((resolve, reject) => {
      window.plugins.socialsharing.shareWithOptions(options, () => resolve(), err => reject(err));
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
