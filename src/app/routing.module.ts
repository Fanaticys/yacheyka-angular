import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from "./components/login/login.component";
import { CallbackComponent } from './components/callback/callback.component';

const routes: Routes = [
	{path: '', loadChildren: 'app/home/home.module#HomeModule'},
	{path: 'search',  loadChildren: 'app/search/search.module#SearchModule'},
	{path: 'admin', loadChildren: 'app/admin/admin.module#AdminModule'},
	{path: 'login', component: LoginComponent},
	{path: 'callback', component: CallbackComponent},
	{path: "**", redirectTo: "", pathMatch: 'full'}
]

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [RouterModule]
})
export class RoutingModule { }
