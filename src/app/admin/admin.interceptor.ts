import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import {Observable} from 'rxjs/Observable'; 
import { Router } from '@angular/router';
import 'rxjs/add/operator/do';
import { Injectable } from '@angular/core';

@Injectable()
export class AdminInterceptor implements HttpInterceptor {
    constructor(public router: Router){}
    
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = localStorage.getItem('token');
        if(token){
            const newRequest = req.clone({
                setHeaders: {
                    'Content-Type' : 'application/json',
                    'token' : token
                }
            })
            return next.handle(newRequest)
            .do(
                () => {},
                (err) => {
                    if(!err.ok) return this.router.navigate(['/login']);
                }
            );
        } else {
            return next.handle(req);
        }
        
    }
}