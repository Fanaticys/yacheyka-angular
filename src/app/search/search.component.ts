import { Component, OnInit, ViewChild, HostBinding } from '@angular/core';
import { SearchService } from './search.service';
import { routeAnimation } from "../route.animation";
import { AuthService } from '../core/auth.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.sass'],
  animations: [ routeAnimation ]
})
export class SearchComponent implements OnInit {
  @HostBinding('@routeAnimation') animation;
  constructor( private searchService: SearchService, public authService: AuthService) {
    this.searchBoxes();
  }
  public boxes = [];
  public enable: boolean = false;
  public params;
  public loading = true;
  @ViewChild('sidebar') sidebarComponent;
  @ViewChild('help') helpComponent;
  @ViewChild('showMap') shawMapComponent;
  @ViewChild('table') tableComponent;

  ngOnInit() { }

  toggleConfig(){
    this.tableComponent.toggleConfig();
  }

  toggleSidebar(){
    this.sidebarComponent.toggleSidebar();
  }

  toggleHelp(){
    this.helpComponent.toggleShow();
  }

  toggleMap(){
    this.shawMapComponent.toggleShow();
  }

  searchBoxes(){
    this.boxes = [];
    this.loading = true;
    return this.searchService.searchBoxes(this.params).subscribe(
      boxes => this.boxes = boxes,
      err => err,
      () => this.loading = false
    );
  }

  paramsUpdated(event){
    this.params = event;
  }

}
