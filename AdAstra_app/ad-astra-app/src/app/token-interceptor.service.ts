import { Injectable, Injector} from '@angular/core';

import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';  
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
/**
 * Set to the Authorization header to the headers of a HttpRequest, so the API will be able to verifyToken(). 
 */
export class TokenInterceptorService implements HttpInterceptor {

  constructor(private injector: Injector) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let authService = this.injector.get(AuthService);

    let tokenizedReq = req.clone({
      // setHeaders: {
      //   // Authorization: 'Bearer xx.yy.zz'
      //   Authorization: `Bearer ${authService.getToken()}`
      // }
      headers: req.headers.set('Authorization', 'bearer ' + authService.getToken())
    })
    return next.handle(tokenizedReq); 
  }
}
