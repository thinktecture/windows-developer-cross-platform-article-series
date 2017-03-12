import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs/Rx';
import {ModelHelperService} from '../../services/modelHelper';
import {PokemonService} from '../../services/pokemon';

@Component({
  selector: 'app-pokemon-detail',
  templateUrl: 'detail.html'
})
export class PokemonDetailComponent implements OnInit, OnDestroy {
  private _subscription: Subscription;

  public id: number;
  public modelProperties: Array<{ key: string, value: string }>;

  constructor(private _activatedRoute: ActivatedRoute, private _pokemonService: PokemonService) {
  }

  public ngOnInit(): void {
    this._subscription = this._activatedRoute.params
      .switchMap(params => {
        this.id = +params['id'];

        return this._pokemonService.get(this.id);
      })
      .subscribe(model => this.modelProperties = ModelHelperService.objectPropertiesToArray(model));
  }

  public ngOnDestroy(): void {
    if (this._subscription) {
      this._subscription.unsubscribe();
    }
  }
}
