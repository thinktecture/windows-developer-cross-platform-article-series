import {Component} from '@angular/core';
import {WindowRef} from '../../services/windowRef';

@Component({
  selector: 'app-menu',
  templateUrl: 'menu.html',
  styleUrls: ['menu.scss']
})
export class MenuComponent {
  private readonly _bodyCssClass = 'show-menu';

  public isStarWarsMenuOpen: boolean;

  constructor(private _windowRef: WindowRef) {
  }

  public toggleStarWarsMenu() {
    this.isStarWarsMenuOpen = !this.isStarWarsMenuOpen;
    this._windowRef.nativeWindow.document.body.classList.toggle(this._bodyCssClass);
  }

  public closeMenu() {
    this.isStarWarsMenuOpen = false;
    this._windowRef.nativeWindow.document.body.classList.remove(this._bodyCssClass);
  }
}
