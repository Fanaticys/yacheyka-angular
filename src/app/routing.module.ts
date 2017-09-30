import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SearchComponent } from './pages/search/search.component';
import { HomeComponent } from './pages/home/home.component';
import { AdminComponent } from './pages/admin/admin.component';
import { LoginComponent } from "./pages/login/login.component";
import { CallbackComponent } from './pages/callback/callback.component';
import { AddComponent } from './pages/admin/add/add.component';
import { AdmTableComponent } from './pages/admin/adm-table/adm-table.component';

import { ScopeGuardService as ScopeGuard } from "./auth0/scope-guard.service";

const routes = [
	{path: 'search', component: SearchComponent },
	{
		path: 'admin', 
		component: AdminComponent, 
		canActivate: [ScopeGuard], 
		data: {
			expectedScopes: ['write:messages']
		},
		children: [
			{path: '', redirectTo: 'table', pathMatch: 'full'},
			{path: 'table', component: AdmTableComponent},
			{path: 'add', component: AddComponent}
		]
	},
	{path: 'login', component: LoginComponent},
	{path: 'callback', component: CallbackComponent},
	{path: '', component: HomeComponent},
	{path: "**", redirectTo: "", pathMatch: 'full'}
]

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [RouterModule]
})
export class RoutingModule { }
