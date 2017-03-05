import {Component} from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: 'menu.html',
  styleUrls: ['menu.scss']
})
export class MenuComponent {
  public isStarWarsMenuOpen: boolean = true;

  public toggleStarWarsMenu() {
    this.isStarWarsMenuOpen = !this.isStarWarsMenuOpen;
  }
}
