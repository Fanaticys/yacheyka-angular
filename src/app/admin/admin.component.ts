import { Component, OnInit } from '@angular/core';
import { AuthService } from "../core/_auth0/auth.service";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.sass']
})
export class AdminComponent implements OnInit { 
  
  profile: any;
  sidebar = false;

  constructor(public auth: AuthService) {
    if(this.auth.userProfile){
      this.profile = this.auth.userProfile;
    } else {
      this.auth.getProfile((err, profile) => {
        this.profile = profile;
      });
    }
  }

  public toggleSidebar(){
    this.sidebar = !this.sidebar;
  }

  ngOnInit(){}


}