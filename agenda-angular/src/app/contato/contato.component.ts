import { Component, OnInit } from '@angular/core';
import {Contato} from './contato';
import {ContatoService} from '../services/contato.service';

@Component({
  selector: 'app-contato',
  templateUrl: './contato.component.html',
  styleUrls: ['./contato.component.css']
})
export class ContatoComponent implements OnInit {

  constructor(private contatoService: ContatoService) { }

  ngOnInit(): void {
    const c: Contato = new Contato();
    c.nome = 'fulano';
    c.email = 'gabrielffguimaraes@gmail.com',
    c.favorito = true;
    c.telefone = '21973550867';

    this.contatoService
      .save(c)
      .subscribe(response => {
        console.log(response);
      }, errors => {
        console.log(errors);
      });
  }

}
