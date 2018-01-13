import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentService } from "./component.service";
import { AuthGuardService } from "./auth-guard.service";
import { AuthHttp, AuthConfig } from "angular2-jwt";
import { Http, RequestOptions } from '@angular/http';
import { AuthService } from './auth.service';

@NgModule({
  imports: [
  CommonModule
  ],
  providers: [
    ComponentService,
    AuthGuardService,
    AuthService
  ],
  declarations: []
})
export class CoreModule { }
