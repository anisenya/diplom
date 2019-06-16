import { AuthService } from '../services';
import { CanActivate, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import {lsTokenName} from '../constants/constants';

@Injectable({
  providedIn: 'root',
})
export class WithAuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (!this.authService.isAuth()) {
      this.router.navigateByUrl('/auth');
      return false;
    }
    return true;
  }
}
