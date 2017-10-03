import { Component, OnInit, ViewChild, HostBinding } from '@angular/core';
import { BoxesService } from '../_services/boxes.service';
import { AuthService } from "../_auth0/auth.service";
import { routeAnimation } from "../_animations/route.animation";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.sass'],
  animations: [ routeAnimation ]
})
export class SearchComponent implements OnInit {
  @HostBinding('@routeAnimation') animation;
  constructor( private boxesService: BoxesService, public auth: AuthService) {
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
    return this.boxesService.searchBoxes(this.params).subscribe(
      boxes => this.boxes = boxes,
      err => err,
      () => this.loading = false
    );
  }

  paramsUpdated(event){
    this.params = event;
  }

}
