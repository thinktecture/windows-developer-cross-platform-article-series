import {Meta, Title} from '@angular/platform-browser';
import {Injectable} from '@angular/core';

@Injectable()
export class SeoService {
  constructor(private _meta: Meta, private _title: Title) {
  }

  public setPageSeo(title: string, description: string, keywords: string) {
    this._title.setTitle(`WinDev :: ${title}`);
    this._meta.updateTag({
      name: 'description',
      content: description
    });
    this._meta.updateTag({
      name: 'keywords',
      content: keywords
    });
  }
}
