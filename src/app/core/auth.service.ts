import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class AuthService {
    public refreshSubscription;
    public redirectUrl: String = '/admin';
    constructor(private http: Http, public router: Router) { }

    private handleError(error: any){
        console.error('Произошла ошибка', error);
        return Observable.throw(error.message || error);
    }

    private setSession(token, expiration){
        localStorage.setItem('token', token);
        localStorage.setItem('expires_at', expiration);
    }

    login(data){
        return this.http.post('/api/login', data)
        .map(response => {
            const data = response.json();
            if(data.success){
                this.setSession(data.token, data.expires_at);
                this.scheduleRenewal();
            }
            return data;
        })
        .catch(this.handleError);
    }

    logout(){
        localStorage.removeItem('token');
        localStorage.removeItem('expires_at');
        this.redirectUrl = '/admin';
        this.router.navigate(['/login']);
        this.unscheduleRenewal();
    }

    isAuthenticated(){
        const expiresAt = JSON.parse(localStorage.getItem('expires_at'));
        const dateNow = Math.floor(new Date().getTime());
        return dateNow < expiresAt;
    }

    scheduleRenewal(){
        if(!this.isAuthenticated()) return;
        this.unscheduleRenewal();
        console.log('scheduleRenewal was called');

        const expiresAt = JSON.parse(localStorage.getItem('expires_at'));
        
        const source = Observable.of(expiresAt).flatMap(
            expiresAt => {
    
            const now = Date.now();
    
            return Observable.timer(Math.max(1, expiresAt - now - 5000));
        });
    
        this.refreshSubscription = source.subscribe(() => {
            this.renewToken().subscribe((data) => {
                this.setSession(data.token, data.expires_at)
                this.scheduleRenewal();
            });
        });
    }

    renewToken(){
        const headers = new Headers({
            'token': localStorage.getItem('token')
        });
        const options = new RequestOptions({headers: headers});
        console.log('renewToken was called');
        return this.http.get('/api/admin/renew', options)
            .map(response => response.json())
            .catch(this.handleError);
    }

    public unscheduleRenewal() {
        if(!this.refreshSubscription) return;
        this.refreshSubscription.unsubscribe();
    }
}