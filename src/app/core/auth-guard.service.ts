import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(
    public router: Router,
    public authService: AuthService
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {

    if(!this.authService.isAuthenticated()){
      const url = state.url;
      this.authService.redirectUrl = url;
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }

}
