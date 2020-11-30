import { Injectable } from '@angular/core';
import { HttpParams, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Usuario } from '../login/usuario';
import { JwtHelperService } from "@auth0/angular-jwt";

@Injectable({
  providedIn: 'root'
})
export class OauthService {
  apiOauth = environment.apiOauth;
  apiUsuarios = environment.apiUsuarios;
  constructor(private http: HttpClient) {}

  cadastrar(usuario: Usuario): Observable<any> {
    return this.http.post<any>(this.apiUsuarios,usuario);
  }
  logar(usuario: Usuario): Observable<any> {
    const params = new HttpParams()
      .set('username', usuario.usuario)
      .set('password', usuario.senha)
      .set('grant_type', 'password');
    return this.http.post<any>(this.apiOauth, params.toString());
  }
  setToken(token: any): void{
    localStorage.setItem('token', btoa(JSON.stringify(token)));
  }
  getToken(): string{
    try{
      if (localStorage.getItem('token') != null && localStorage.getItem('token') != "") {
        return JSON.parse(atob(localStorage.getItem('token'))).access_token;
      } else {
        return null;
      }
    } catch(e) {
      console.log("erro ao decodificar token");
      return null;
    }
  }
  clearToken(): void{
    localStorage.removeItem('token');
  }
  logout(): void{
    this.clearToken();
  }
  isValidToken(): boolean {
    const helper = new JwtHelperService();
    const token = this.getToken();
    if(token){
      let validToken: boolean = !helper.isTokenExpired(token);
      return validToken;
    } else {
      return false;
    }
  }
}
