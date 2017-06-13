import {WindowRef} from './windowRef';
import {Injectable} from '@angular/core';

interface ElectronWindow extends Window {
  require(module: string): Electron.ElectronMainAndRenderer;
}

@Injectable()
export class ElectronService {
  private _electron: Electron.ElectronMainAndRenderer;

  constructor(private _windowRef: WindowRef) {
  }

  public get electron(): Electron.ElectronMainAndRenderer {
    if (!this._electron) {
      this._electron = (<ElectronWindow>this._windowRef.nativeWindow).require('electron');
    }

    return this._electron;
  }
}
