import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoxesService } from './boxes.service';
import { ComponentService } from "./component.service";
import { AuthService } from "./_auth0/auth.service";
import { ScopeGuardService } from "./_auth0/scope-guard.service";
import { AuthHttp, AuthConfig } from "angular2-jwt";
import { Http, RequestOptions } from '@angular/http';

export function authHttpServiceFactory(http: Http, options: RequestOptions) {
  return new AuthHttp(new AuthConfig({
    tokenGetter: (() => localStorage.getItem('access_token')),
    globalHeaders: [{'Content-Type': 'application/json'}],
  }), http, options);
}

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [
    AuthService,
    ComponentService,
    ScopeGuardService,
    {
      provide: AuthHttp,
      useFactory: authHttpServiceFactory,
      deps: [Http, RequestOptions]
    },
    BoxesService
  ],
  declarations: []
})
export class CoreModule { }
