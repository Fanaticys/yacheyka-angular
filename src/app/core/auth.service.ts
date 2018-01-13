import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/observable/timer';
import 'rxjs/add/observable/throw';
import 'rxjs/add/observable/of';

@Injectable()
export class AuthService {
    public refreshSubscription;
    public redirectUrl: String = '/admin';
    constructor(private http: Http, public router: Router, @Inject(PLATFORM_ID) private platformId: Object) {}

    private handleError(error: any){
        console.error('Произошла ошибка', error);
        return Observable.throw(error.message || error);
    }

    private setSession(token, expiration){
        localStorage.setItem('token', token);
        localStorage.setItem('expires_at', expiration);
    }

    login(data){
        return this.http.post('http://localhost:8080/api/login', data)
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
        if (isPlatformBrowser(this.platformId)){
            const expiresAt = JSON.parse(localStorage.getItem('expires_at'));
            const dateNow = Math.floor(new Date().getTime());
            return dateNow < expiresAt;
        } else {
            return false;
        }
    }

    scheduleRenewal(){
        if(!this.isAuthenticated()) return;
        this.unscheduleRenewal();
        console.log('scheduleRenewal was called');

        const expiresAt = JSON.parse(localStorage.getItem('expires_at'));
        
        // const source = Observable.of(expiresAt).flatMap(
        const source = Observable.of(expiresAt).mergeMap(
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
        return this.http.get('http://localhost:8080/api/admin/renew', options)
            .map(response => response.json())
            .catch(this.handleError);
    }

    public unscheduleRenewal() {
        if(!this.refreshSubscription) return;
        this.refreshSubscription.unsubscribe();
    }
}