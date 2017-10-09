import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from "./components/login/login.component";
import { CallbackComponent } from './components/callback/callback.component';
import { ScopeGuardService } from './core/_auth0/scope-guard.service';

const routes: Routes = [
	{path: 'search',  loadChildren: 'app/search/search.module#SearchModule'},
	{
		path: 'admin', 
		loadChildren: 'app/admin/admin.module#AdminModule',
		canActivate: [ScopeGuardService], 
		data: {
			expectedScopes: ['write:messages']
		}
	},
	{path: 'callback', component: CallbackComponent},
	{path: 'login', component: LoginComponent},
	{path: '**', redirectTo: '', pathMatch: 'full'}
]

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [RouterModule]
})
export class RoutingModule { }
