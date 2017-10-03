import { Component } from '@angular/core';
import { AuthService } from "./_auth0/auth.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent { 
  constructor(private auth: AuthService){ 
    auth.handleAuthentication();
  }
}
