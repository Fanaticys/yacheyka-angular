import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpModule, Http, RequestOptions } from '@angular/http';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { RoutingModule } from './routing.module';

import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { CallbackComponent } from './components/callback/callback.component';
import { LoginComponent } from './components/login/login.component';

import { BoxesService } from './_services/boxes.service';
import { ComponentService } from "./_services/component.service";
import { AuthService } from "./_auth0/auth.service";
import { AuthHttp, AuthConfig } from "angular2-jwt";
import { ScopeGuardService } from "./_auth0/scope-guard.service";
import { SearchModule } from './search/search.module';
import { HomeModule } from './home/home.module';

export function authHttpServiceFactory(http: Http, options: RequestOptions) {
  return new AuthHttp(new AuthConfig({
    tokenGetter: (() => localStorage.getItem('access_token')),
    globalHeaders: [{'Content-Type': 'application/json'}],
  }), http, options);
}

@NgModule({
  declarations: [
    AppComponent,
    CallbackComponent,
    LoginComponent
  ],
  imports: [
    RoutingModule,
    BrowserModule,
    HttpModule,
    SearchModule,
    HomeModule,
    BrowserAnimationsModule
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
  bootstrap: [AppComponent]
})
export class AppModule { }
