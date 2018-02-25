import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class SearchService {

  constructor(private http: HttpClient) { }

  private handleError(error: any){
    console.error('Произошла ошибка', error);
    return Observable.throw(error.message || error);
  }

  searchBoxes(options: object){
    let params: HttpParams = new HttpParams();
    for(let name in options){
      params = params.append(name, options[name]);
    }
    return this.http.get('/api/boxes', { params: params})
      .catch(this.handleError);
  }

}