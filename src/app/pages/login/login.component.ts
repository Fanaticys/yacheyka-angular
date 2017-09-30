import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../auth0/auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {

  constructor(private auth: AuthService) { }

  ngOnInit() {
    this.auth.login();
  }

}
