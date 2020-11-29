import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { OauthService } from "./oauth.service";

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  clientId: string = environment.clientID;
  secretId: string = environment.secretID;
  oauthUrl: string = environment.apiOauth;
  headers:any;
  constructor(private oauth: OauthService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if(request.url.includes(this.oauthUrl)) {
      this.headers = {
        'Authorization': 'Basic ' + btoa(`${this.clientId}:${this.secretId}`),
        'Content-Type': 'application/x-www-form-urlencoded'
      };
    } else {
      this.headers = {
        'Authorization': 'Bearer ' + this.oauth.getToken()
      }
    }
    request = request.clone({
      setHeaders: this.headers
    });
    return next.handle(request);
  }

}
