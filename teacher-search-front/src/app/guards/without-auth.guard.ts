import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services';
import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root',
})
export class WithoutAuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (this.authService.isAuth() ) {
      this.router.navigateByUrl('/auth');
      return false;
    }
    return true;
  }
}
