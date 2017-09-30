import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, Http, RequestOptions } from '@angular/http';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { PaginationModule } from 'ngx-bootstrap';
import { NouisliderModule } from 'ng2-nouislider';
import { RoutingModule } from './routing.module';

import { AppComponent } from './app.component';
import { SearchComponent } from './pages/search/search.component';
import { AdminComponent } from './pages/admin/admin.component';
import { HomeComponent } from './pages/home/home.component';
import { CallbackComponent } from './pages/callback/callback.component';
import { LoginComponent } from './pages/login/login.component';
import { TableDemoComponent } from './components/result-table/table.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';

import { BoxesService } from './services/boxes.service';
import { ComponentService } from "./services/component.service";
import { AuthService } from "./auth0/auth.service";
import { AuthHttp, AuthConfig } from "angular2-jwt";
import { ScopeGuardService } from "./auth0/scope-guard.service";
import { AddComponent } from './pages/admin/add/add.component';
import { AdmTableComponent } from './pages/admin/adm-table/adm-table.component';
import { HelpComponent } from './components/help/help.component';
import { ResultHandlerComponent } from './components/result-handler/result-handler.component';

export function authHttpServiceFactory(http: Http, options: RequestOptions) {
  return new AuthHttp(new AuthConfig({
    tokenGetter: (() => localStorage.getItem('access_token')),
    globalHeaders: [{'Content-Type': 'application/json'}],
  }), http, options);
}

@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    HomeComponent,
    TableDemoComponent,
    SidebarComponent,
    AdminComponent,
    CallbackComponent,
    LoginComponent,
    AddComponent,
    AdmTableComponent,
    HelpComponent,
    ResultHandlerComponent
  ],
  imports: [
    PaginationModule.forRoot(),
    RoutingModule,
    BrowserModule,
    FormsModule,
    HttpModule,
    NouisliderModule,
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
