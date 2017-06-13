import {Component, OnInit} from '@angular/core';
import {SeoService} from '../../services/seo';

@Component({
  selector: 'app-home',
  templateUrl: 'home.html'
})
export class HomeComponent implements OnInit {
  constructor(private _seoService: SeoService) {
  }

  public ngOnInit(): void {
    this._seoService.setPageSeo('Home', 'Home page of the sample', 'home page');
  }
}
