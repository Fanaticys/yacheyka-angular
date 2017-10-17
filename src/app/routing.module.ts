import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CallbackComponent } from './components/callback/callback.component';
import { AuthGuardService } from './core/auth-guard.service';

const routes: Routes = [
	{path: 'search',  loadChildren: 'app/search/search.module#SearchModule'},
	{
		path: 'admin', 
		loadChildren: 'app/admin/admin.module#AdminModule',
		canActivate: [AuthGuardService]
	},
	{path: 'callback', component: CallbackComponent},
	{path: 'login', loadChildren: "app/login/login.module#LoginModule"},
	{path: '**', redirectTo: '', pathMatch: 'full'}
]

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [RouterModule]
})
export class RoutingModule { }
