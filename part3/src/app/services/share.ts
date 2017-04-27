import {PlatformService} from './platform';

export function shareServiceFactory() {
  if (PlatformService.isCordovaApplication()) {
    return new MobileShareService();
  }

  return new DesktopShareService();
}

export abstract class ShareService {
  public abstract share(title: string, description: string): Promise<void>;
}

export class DesktopShareService extends ShareService {
  public share(title: string, description: string): Promise<void> {
    window.open(`mailto:?subject=${title}&body=${encodeURIComponent(description)}`, '_self');
    return Promise.resolve();
  }
}

export class MobileShareService extends ShareService {
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
