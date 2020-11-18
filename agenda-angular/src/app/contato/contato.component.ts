import { Component, OnInit } from '@angular/core';
import {Contato} from './contato';
import {ContatoService} from '../services/contato.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-contato',
  templateUrl: './contato.component.html',
  styleUrls: ['./contato.component.css']
})
export class ContatoComponent implements OnInit {
  formulario: FormGroup;
  contatos: Contato[];
  colunas: string[] = [
    'nome',
    'email',
    'favorito',
    'telefone'
  ];
  constructor( private contatoService: ContatoService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.montarFormulario();
    this.listarContatos();
  }
  montarFormulario(): void{
    this.formulario = this.formBuilder.group({
      nome: ['', Validators.required],
      email: ['', [Validators.email, Validators.required]],
      favorito: [false],
      telefone: ['', Validators.required]
    });
  }
  listarContatos(): void {
    this.contatoService
      .list()
      .subscribe( response => {
        this.contatos = response;
      }, errors => {
        console.log(errors);
      });
  }
  favoritar(contato: Contato): void {
    this.setLoading(contato);
    this.contatoService
      .favoritar(contato)
      .subscribe( response => {
        contato.favorito = !contato.favorito;
        this.setLoading(contato);
      }, error => {

      });
  }
  setLoading(contato: Contato, flag: boolean = null): void {
    if (flag) {
      contato.loading = contato.loading === undefined ? false : contato.loading;
    } else {
      contato.loading = !(contato.loading);
    }
  }
  onSubmit(): void {
    let c: Contato = new Contato();
    c = this.formulario.value;

    this.contatoService
      .save(c)
      .subscribe(response => {
        const lista: Contato[] = [ ... this.contatos, response];
        this.contatos = lista;
      }, errors => {
        console.log(errors);
      });
  }
}
