import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { AdminRoutingModule } from './admin-routing.module';
import { AddComponent } from './add/add.component';
import { AdmTableComponent } from './adm-table/adm-table.component';
import { FormsModule } from '@angular/forms';
import { PaginationModule } from 'ngx-bootstrap';
import { ModalComponent } from '../components/modal/modal.component';
import { ResultHandlerComponent } from '../components/result-handler/result-handler.component';
import { AdminService } from './admin.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    PaginationModule.forRoot(),
    AdminRoutingModule
  ],
  declarations: [
    AdminComponent,
    AddComponent,
    AdmTableComponent,
    ModalComponent,
    ResultHandlerComponent
  ],
  providers: [AdminService]
})
export class AdminModule { }
