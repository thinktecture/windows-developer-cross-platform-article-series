interface ElectronWindow extends Window {
  require(module: string): Electron.ElectronMainAndRenderer;
}

declare const window: ElectronWindow;

export class ElectronService {
  private _electron: Electron.ElectronMainAndRenderer;

  public get electron(): Electron.ElectronMainAndRenderer {
    if (!this._electron) {
      this._electron = window.require ? window.require('electron') : null;
    }

    return this._electron;
  }
}
