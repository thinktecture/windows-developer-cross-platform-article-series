import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {BaseModel} from '../../models/baseModel';
import {Subscription} from 'rxjs/Rx';
import {PokemonService} from '../../services/pokemon';

@Component({
  selector: 'app-star-wars-list',
  templateUrl: 'list.html'
})
export class PokemonListComponent implements OnInit, OnDestroy {
  private _subscription: Subscription;

  public modelList: BaseModel[];
  public model = 'pokemon';
  public modelName  = 'Pokemon';
  public page: number;

  constructor(private _activatedRoute: ActivatedRoute, private _pokemonService: PokemonService) {
  }

  public ngOnInit(): void {
    this._subscription = this._activatedRoute.params
      .switchMap(params => {
        this.page = +params['page'];

        return this._pokemonService.list(this.page);
      })
      .subscribe((model: BaseModel[]) => {
        this.modelList = model;
      });
  }

  public ngOnDestroy(): void {
    if (this._subscription) {
      this._subscription.unsubscribe();
    }
  }
}
