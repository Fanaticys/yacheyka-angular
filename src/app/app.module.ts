import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { RoutingModule } from './routing.module';

import { AppComponent } from './app.component';
import { CallbackComponent } from './components/callback/callback.component';

import { CoreModule } from './core/core.module';
import { HomeModule } from './home/home.module';
@NgModule({
  declarations: [
    AppComponent,
    CallbackComponent
  ],
  imports: [
    BrowserModule.withServerTransition({appId: 'my-app'}),
    BrowserAnimationsModule,
    HttpClientModule,
    HomeModule,
    CoreModule,
    RoutingModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
