import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import {UserService} from '../shared/user.service';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private userService : UserService,private router : Router){}

  canActivate(// inside which we identify wether a user is logged in or not
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot):boolean{
      if (!this.userService.isLoggedIn()) {// in order to handle non authenticated user
        this.router.navigateByUrl('/login');
        this.userService.deleteToken();
        return false;
      }
    return true;
  }
  
}
