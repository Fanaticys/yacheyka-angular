import { Component, OnInit } from '@angular/core';
import { AuthService } from '../core/auth.service';
import { AdminService } from './admin.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.sass']
})
export class AdminComponent implements OnInit { 
  
  profile: any;
  sidebar = false;

  constructor(
    public authService: AuthService,
    public adminService: AdminService
  ) {
    adminService.getProfile().subscribe(obj => {
      this.profile = obj;
    });
  }

  public toggleSidebar(){
    this.sidebar = !this.sidebar;
  }

  ngOnInit(){}

  logout(){
    this.authService.logout();
  }

}