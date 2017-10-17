import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SearchRoutingModule } from './search-routing.module';
import { SearchComponent } from './search.component';
import { TableDemoComponent } from '../components/result-table/table.component';
import { PaginationModule } from 'ngx-bootstrap';
import { SidebarComponent } from '../components/sidebar/sidebar.component';
import { HelpComponent } from '../components/help/help.component';
import { SearchService } from './search.service';

import { NouisliderModule } from 'ng2-nouislider';

@NgModule({
    declarations: [
        SearchComponent,
        TableDemoComponent,
        SidebarComponent,
        HelpComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        SearchRoutingModule,
        NouisliderModule,
        PaginationModule.forRoot()
    ],
    providers: [SearchService]
})
export class SearchModule {

}