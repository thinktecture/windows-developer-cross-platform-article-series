import {Component} from '@angular/core';
import {WindowRef} from '../../services/windowRef';
import {ResponsiveService} from '../../services/responsive';

// TODO: animating this is a kind of a mess :)

@Component({
  selector: 'app-menu',
  templateUrl: 'menu.html',
  styleUrls: ['menu.scss']
})
export class MenuComponent {
  private readonly _bodyCssClass = 'show-menu';

  public isStarWarsMenuOpen: boolean;
  public isStarWarsMenuClosing: boolean;
  public isStarWarsMenuOpening: boolean;
  public isPokemonMenuOpen: boolean;
  public isPokemonMenuClosing: boolean;
  public isPokemonMenuOpening: boolean;

  constructor(private _windowRef: WindowRef, private _responsiveService: ResponsiveService) {
  }

  public toggleStarWarsMenu() {
    if (this.isPokemonMenuOpen) {
      if (this._responsiveService.isPhone) {
        this.isStarWarsMenuOpening = true;
        return this.isPokemonMenuClosing = true;
      }

      this.closeMenu();
    }
    this.isStarWarsMenuOpen = !this.isStarWarsMenuOpen;
    this._windowRef.nativeWindow.document.body.classList.toggle(this._bodyCssClass);
  }

  public togglePokemonMenu() {
    if (this.isStarWarsMenuOpen) {
      if (this._responsiveService.isPhone) {
        this.isPokemonMenuOpening = true;
        return this.isStarWarsMenuClosing = true;
      }

      this.closeMenu();
    }
    this.isPokemonMenuOpen = !this.isPokemonMenuOpen;
    this._windowRef.nativeWindow.document.body.classList.toggle(this._bodyCssClass);
  }

  public closeMenu() {
    this.isStarWarsMenuOpen = false;
    this.isPokemonMenuOpen = false;
    this._windowRef.nativeWindow.document.body.classList.remove(this._bodyCssClass);
  }

  public animationEnd(event: TransitionEvent) {
    if (!this.isStarWarsMenuClosing && !this.isPokemonMenuClosing) {
      return;
    }

    if (this.isStarWarsMenuClosing) {
      this.closeMenu();
      this.isPokemonMenuOpen = true;
      this._windowRef.nativeWindow.document.body.classList.add(this._bodyCssClass);
    }

    if (this.isPokemonMenuClosing) {
      this.closeMenu();
      this.isStarWarsMenuOpen = true;
      this._windowRef.nativeWindow.document.body.classList.add(this._bodyCssClass);
    }

    this.isStarWarsMenuClosing = false;
    this.isStarWarsMenuOpening = false;
    this.isPokemonMenuClosing = false;
    this.isPokemonMenuOpening = false;
  }
}
