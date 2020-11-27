import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import {environment} from '../../environments/environment';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  clientId: string = environment.clientID;
  secretId: string = environment.secretID;
  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    //console.log(this.clientId + ':' + this.secretId)
    //const headers: any = {
    //  'Authorization':'Basic Y29udGF0by1hcHBsaWNhdGlvbjpAMzIx',/* 'Basic ' + btoa(`${this.clientId}:${this.secretId}`*/
    //  'Content-Type': 'application/x-www-form-urlencoded'
    //};
    /*request = request.clone({
      setHeaders: headers
    });*/
    return next.handle(request);
  }

}
