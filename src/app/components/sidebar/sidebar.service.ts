import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class SidebarService {

    constructor(private http: HttpClient) { }

    private handleError(error: any){
        console.error('Произошла ошибка', error);
        return Observable.throw(error.message || error);
    }

    getRangeValues(){
        return this.http.get('/api/range-values')
            .catch(this.handleError);
    }

    getBanks(){
        return this.http.get('/api/banks')
            .catch(this.handleError);
    }

    getTowns(){
        return this.http.get('/api/towns')
            .catch(this.handleError);
    }
}