import {NgServiceWorker} from '@angular/service-worker';
import {Http} from '@angular/http';
import {Injectable} from '@angular/core';

import 'rxjs/add/operator/switchMap';

@Injectable()
export class NotificationService {
  constructor(private _serviceWorker: NgServiceWorker, private _http: Http) {
  }

  public register(): void {
    this._serviceWorker.registerForPush()
      .switchMap(subscription => this._http.post('http://localhost:9090/push/register', subscription))
      .subscribe();
  }
}
