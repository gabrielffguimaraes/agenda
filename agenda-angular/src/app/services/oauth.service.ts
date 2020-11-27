import { Injectable } from '@angular/core';
import { HttpParams, HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {Usuario} from '../login/usuario';

@Injectable({
  providedIn: 'root'
})
export class OauthService {
  apiOauth = environment.apiOauth;

  constructor(private http: HttpClient) {}

  logar(usuario :Usuario) : Observable<any> {
    let params = new HttpParams()
      .set('username',usuario.usuario)
      .set('password',usuario.senha)
      .set('grant_type','password');
    const headers: any = {
      'Authorization':'Basic Y29udGF0by1hcHBsaWNhdGlvbjpAMzIx',/* 'Basic ' + btoa(`${this.clientId}:${this.secretId}`*/
      'Content-Type': 'application/x-www-form-urlencoded'
    };
    return this.http.post<any>(this.apiOauth,params.toString(), { headers })
  }
}
