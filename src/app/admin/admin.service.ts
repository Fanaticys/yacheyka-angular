import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class AdminService {
    constructor(private http: Http){} 

    private getToken(){
        return localStorage.getItem('token');
    }

    getProfile(){
        const token = this.getToken();
        const headers = new Headers({
            'Content-Type' : 'application/json',
            'token' : token
        });
        const options = new RequestOptions({ headers: headers });

        return this.http.get('/api/admin/profile', options)
            .map(response => response.json())
            .catch(this.handleError);
    }

    searchBoxes(){
        const token = this.getToken();
        const headers = new Headers({
            'Content-Type' : 'application/json',
            'token' : token
        });
        const options = new RequestOptions({ headers: headers });

        return this.http.get('/api/admin/boxes', options)
            .map(response => response.json())
            .catch(this.handleError);
      }

    addBox(box){
        const token = this.getToken();
        const headers = new Headers({
            'Content-Type' : 'application/json',
            'token' : token
        });
        const options = new RequestOptions({ headers: headers });

        return this.http.post("/api/admin/box", box, options)
            .map(response => response.json())
            .catch(this.handleError);
    }

    deleteBox(id){
        const token = this.getToken();
        const headers = new Headers({
            'Content-Type' : 'application/json',
            'token' : token
        });
        const params: URLSearchParams = new URLSearchParams();
        params.set("id", id);
        const options = new RequestOptions({ 
            headers: headers,
            search: params 
        });
        return this.http.delete("/api/admin/box", options)
          .map(response => response.json())
          .catch(this.handleError);
    }
    
    updateBox(data){
        const token = this.getToken();
        const headers = new Headers({
            'Content-Type' : 'application/json',
            'token' : token
        });
        const options = new RequestOptions({ headers: headers });

        return this.http.put("/api/admin/box", data, options)
            .map(response => response.json())
            .catch(this.handleError);
    }

    private handleError(error: any){
        console.error('Произошла ошибка', error);
        return Observable.throw(error.message || error);
    }
}