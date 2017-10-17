import { Injectable } from '@angular/core';
import { Http, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class SidebarService {

    constructor(private http: Http) { }

    private handleError(error: any){
        console.error('Произошла ошибка', error);
        return Observable.throw(error.message || error);
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
}