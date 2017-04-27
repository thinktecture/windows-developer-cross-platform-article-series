import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Observable} from 'rxjs/Rx';
import {StarWarsPeople} from '../models/starWarsPeople';
import {WindowRef} from './windowRef';
import {StarWarsPlanet} from '../models/starWarsPlanet';

@Injectable()
export class StarWarsService {
  private readonly _baseUrl: string;

  constructor(private _http: Http, windowRef: WindowRef) {
    this._baseUrl = (windowRef.nativeWindow.location.href.startsWith('https') ? 'https' : 'http') + '://swapi.co/api/';
  }

  public listPeople(page: number = 1): Observable<StarWarsPeople[]> {
    return this._list('people', page, obj => StarWarsPeople.deserialize(obj));
  }

  public listPlanets(page: number = 1): Observable<StarWarsPlanet[]> {
    return this._list('planets', page, obj => StarWarsPlanet.deserialize(obj));
  }

  private _list<T>(what: string, page: number, deserializeFn: (obj: any) => T): Observable<T[]> {
    return this._http.get(`${this._baseUrl}${what}?page=${page}`)
      .map(response => response.json())
      .switchMap((json: any) => Observable.from(json.results))
      .map(obj => deserializeFn(obj))
      .toArray();
  }

  public getPeople(id: number): Observable<StarWarsPeople> {
    return this._get('people', id, obj => StarWarsPeople.deserialize(obj));
  }

  public getPlanet(id: number): Observable<StarWarsPlanet> {
    return this._get('planets', id, obj => StarWarsPlanet.deserialize(obj));
  }

  private _get<T>(what: string, id: number, deserializeFn: (obj: any) => T): Observable<T> {
    return this._http.get(`${this._baseUrl}${what}/${id}`)
      .map(response => response.json())
      .map(obj => deserializeFn(obj));
  }
}
