import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class AuthService {

    public redirectUrl: String = '/admin';
    constructor(private http: Http, public router: Router) { }

    login(data){
        return this.http.post('/api/login', data)
        .map(response => {
            const data = response.json();
            if(data.success){
                localStorage.setItem('token', data.token);
                localStorage.setItem('expires_at', data.expires_at);
            }
            return data;
        })
        .catch(this.handleError);
    }

    private handleError(error: any){
        console.error('Произошла ошибка', error);
        return Observable.throw(error.message || error);
    }

    logout(){
        localStorage.removeItem('token');
        localStorage.removeItem('expires_at');
        this.redirectUrl = '/admin';
        this.router.navigate(['/login']);
    }

    isAuthenticated(){
        const expiresAt = JSON.parse(localStorage.getItem('expires_at'));
        const dateNow = Math.floor(new Date().getTime()/1000);
        return dateNow < expiresAt;
    }

}