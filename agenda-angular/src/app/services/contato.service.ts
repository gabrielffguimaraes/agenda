import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Contato} from '../contato/contato';
import {environment} from '../../environments/environment';
import {delay} from 'rxjs/operators';
import {PaginaContato} from '../contato/paginaContato';
import { JwtHelperService } from '@auth0/angular-jwt';
import { OauthService } from './oauth.service';

@Injectable({
  providedIn: 'root'
})

export class ContatoService {
  url: string = environment.apiUrl;
  constructor(private http: HttpClient, private oauth: OauthService) {}

  save(contato: FormData): Observable<Contato> {
    return this.http.post<Contato>(this.url, contato);
  }
  list(page: number, size: number): Observable<PaginaContato> {
    const helper = new JwtHelperService();
    const obj = helper.decodeToken(this.oauth.getToken());
    const params = new HttpParams().
      set('page', page.toString()).
      set('size', size.toString()).
      set('user_name', obj.user_name);
    return this.http.get<PaginaContato>(`${this.url}?${params.toString()}`);
  }
  favoritar(contato: Contato): Observable<any> {
    return this.http.patch(`${this.url}/${contato.id}/favorite`, contato).pipe(delay(1000));
  }
  getContatoById(id: number): Observable<Contato> {
    return this.http.get<Contato>(`${this.url}/${id}`);
  }
  edit(id: number, contato: FormData): Observable<Contato> {
    return this.http.put<Contato>(`${this.url}/${id}`, contato);
  }
  erase(id: number): Observable<any> {
    return this.http.delete<any>(`${this.url}/${id}`);
  }
}
