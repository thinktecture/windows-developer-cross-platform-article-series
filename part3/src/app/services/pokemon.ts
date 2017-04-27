import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Observable} from 'rxjs/Rx';
import {WindowRef} from './windowRef';
import {Pokemon} from '../models/pokemon';

// This could be merged with the StarWars Service, since both APIs are quite identical. But that would introduce a not necessary
// complexity for a demo.
@Injectable()
export class PokemonService {
  private readonly _baseUrl: string;
  private readonly _pageOffsetSize = 20;

  constructor(private _http: Http, windowRef: WindowRef) {
    this._baseUrl = (windowRef.nativeWindow.location.href.startsWith('https') ? 'https' : 'http') + '://pokeapi.co/api/v2/';
  }

  public list(page: number = 1): Observable<Pokemon[]> {
    return this._http.get(`${this._baseUrl}pokemon?offset=${(page - 1) * this._pageOffsetSize}`)
      .map(response => response.json())
      .switchMap((json: any) => Observable.from(json.results))
      .map(obj => Pokemon.deserialize(obj))
      .toArray();
  }

  public get(id: number): Observable<Pokemon> {
    return this._http.get(`${this._baseUrl}pokemon/${id}`)
      .map(response => response.json())
      .map(obj => Pokemon.deserialize(obj));
  }
}
