import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Contato} from '../contato/contato';
import {environment} from '../../environments/environment';
import {delay} from 'rxjs/operators';
import {Form} from '@angular/forms';

@Injectable({
  providedIn: 'root'
})

export class ContatoService {
  url: string = environment.apiUrl;
  constructor(private http: HttpClient) {}

  save(contato: FormData): Observable<Contato> {
    return this.http.post<Contato>(this.url, contato);
  }
  list(): Observable<Contato[]> {
    return this.http.get<Contato[]>(this.url);
  }
  favoritar(contato: Contato): Observable<any> {
    return this.http.patch(`${this.url}/${contato.id}/favorite`, contato).pipe(delay(1000));
  }
  /*
  upload(contato: Contato , formData: FormData): Observable<any> {
      return this.http.put(`${this.url}/${contato.id}/foto`, formData , { responseType: 'blob' });
  }
  */
}
