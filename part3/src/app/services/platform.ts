export class PlatformService {
  public static isBrowserApplication(): boolean {
    return !PlatformService.isCordovaApplication();
  }

  public static isCordovaApplication(): boolean {
    return !!window.cordova;
  }
}
