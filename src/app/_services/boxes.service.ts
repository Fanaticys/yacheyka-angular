import { Injectable } from '@angular/core';
import { Headers, Http, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { AuthHttp } from 'angular2-jwt';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class BoxesService {

	private headers = new Headers({'Content-Type' : 'application/json'});

  constructor(private http: Http, private authHttp: AuthHttp) { }

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

  getRangeValues(){
    return this.http.get('/api/range-values')
      .map(response => response.json())
      .catch(this.handleError);
  }

  getBanks(){
    return this.http.get('/api/banks')
      .map(response => response.json())
      .catch(this.handleError);
  }

  getTowns(){
    return this.http.get('/api/towns')
      .map(response => response.json())
      .catch(this.handleError);
  }

  addBox(box){
    return this.authHttp.post("/api/add-box", box)
      .map(response => response.json())
      .catch(this.handleError);
  }

  deleteBox(id){
    return this.authHttp.post("/api/delete-box", {id: id})
      .map(response => response.json())
      .catch(this.handleError);
  }

  updateBox(data){
      return this.authHttp.post("/api/update-box", data)
        .map(response => response.json())
        .catch(this.handleError);
  }
}