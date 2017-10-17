import { Injectable } from '@angular/core';
import { Http, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class SearchService {

  constructor(private http: Http) { }

  private handleError(error: any){
    console.error('Произошла ошибка', error);
    return Observable.throw(error.message || error);
  }

  searchBoxes(options: object){
    let params: URLSearchParams = new URLSearchParams();
    for(let name in options){
      params.set(name, options[name]);
    }
  	return this.http.get('/api/boxes', {search: params})
  	  .map(response => response.json())
      .catch(this.handleError);
  }

}