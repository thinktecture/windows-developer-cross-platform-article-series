import {Component, OnDestroy, OnInit} from '@angular/core';
import {StarWarsService} from '../../services/starWars';
import {ActivatedRoute, Router} from '@angular/router';
import {StarWarsBase} from '../../models/starWarsBase';
import {Subscription} from 'rxjs/Rx';

@Component({
  selector: 'app-list',
  templateUrl: 'list.html'
})
export class ListComponent implements OnInit, OnDestroy {
  private _serviceMap: Map<string, Function> = new Map<string, Function>();
  private _subscription: Subscription;

  public modelList: StarWarsBase[];
  public model: string;
  public modelName: string;
  public page: number;

  constructor(private _activatedRoute: ActivatedRoute, private _starWarsService: StarWarsService) {
    this._initMap();
  }

  public ngOnInit(): void {
    this._subscription = this._activatedRoute.params
      .switchMap(params => {
        this.page = +params['page'];
        this.model = params['model'];
        this.modelName = this.model.substring(0, 1).toUpperCase() + this.model.substring(1);

        return this._serviceMap.get(this.model)(this.page);
      })
      .subscribe((model: StarWarsBase[]) => this.modelList = model);
  }

  private _initMap() {
    this._serviceMap.set('people', this._starWarsService.listPeople.bind(this._starWarsService));
    this._serviceMap.set('planets', this._starWarsService.listPlanets.bind(this._starWarsService));
  }

  public ngOnDestroy(): void {
    if (this._subscription) {
      this._subscription.unsubscribe();
    }
  }
}
