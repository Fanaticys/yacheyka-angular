import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../_auth0/auth.service";

@Component({
  selector: 'app-login',
  template: '',
})
export class LoginComponent implements OnInit {

  constructor(private auth: AuthService) { }

  ngOnInit() {
    this.auth.login();
  }

}