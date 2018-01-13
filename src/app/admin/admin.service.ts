import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';

import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class AdminService {
    constructor(private http: HttpClient){}

    getProfile(){
        return this.http.get('http://localhost:8080/api/admin/profile')
            .catch(this.handleError);
    }

    searchBoxes(){
        return this.http.get('http://localhost:8080/api/admin/boxes')
            .catch(this.handleError);
      }

    addBox(box){
        return this.http.post('http://localhost:8080/api/admin/box', box)
            .catch(this.handleError);
    }

    deleteBox(id){
        return this.http.delete(`http://localhost:8080/api/admin/box?id=${id}`);
    }
    
    updateBox(data){
        return this.http.put('http://localhost:8080/api/admin/box', data)
            .catch(this.handleError);
    }

    private handleError(error: any){
        console.error('Произошла ошибка', error);
        return Observable.throw(error.message || error);
    }
}