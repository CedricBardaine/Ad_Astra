import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
/**
 * Prevents the client from navigating to a Component if he is not logged, by redirecting him.
 */
export class AuthGuard implements CanActivate {

  constructor(
    private _authService: AuthService , 
    private _router: Router 
    ) { }

  canActivate(): boolean {
    if (this._authService.loggedIn() )
      return true ;
    else {
      this._router.navigate(['/connect']); 
      return false ;  
    }
  }
  
}
