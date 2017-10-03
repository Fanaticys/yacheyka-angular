import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminComponent } from './admin.component';
import { AddComponent } from './add/add.component';
import { AdmTableComponent } from './adm-table/adm-table.component';

import { ScopeGuardService as ScopeGuard } from "../_auth0/scope-guard.service";

const routes: Routes = [
    {
		path: '', 
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
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdminRoutingModule {

}