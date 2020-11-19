import { Component, OnInit } from '@angular/core';
import { Contato } from './contato';
import { ContatoService } from '../services/contato.service';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ContatoModalComponent } from '../modais/contato-modal/contato-modal.component';

@Component({
  selector: 'app-contato',
  templateUrl: './contato.component.html',
  styleUrls: ['./contato.component.css']
})
export class ContatoComponent implements OnInit {
  foto: any;
  formulario: FormGroup;
  contatos: Contato[];
  colunas: string[] = [
    'foto',
    'nome',
    'email',
    'favorito',
    'telefone'
  ];
  constructor( private dialog: MatDialog, private contatoService: ContatoService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.montarFormulario();
    this.listarContatos();
  }
  montarFormulario(): void{
    this.formulario = this.formBuilder.group({
      nome: ['', Validators.required],
      email: ['', [Validators.email, Validators.required]],
      favorito: [false],
      telefone: ['', Validators.required],
      foto: []
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
  setFoto(event){
    const files = event.target.files;
    if (files){
      this.foto = files[0];
    }
  }
  setLoading(contato: Contato, flag: boolean = null): void {
    if (flag) {
      contato.loading = contato.loading === undefined ? false : contato.loading;
    } else {
      contato.loading = !(contato.loading);
    }
  }
  onSubmit(): any {
    const c: FormData = new FormData();
    c.append('nome', this.formulario.value.nome);
    c.append('email', this.formulario.value.email);
    c.append('favorito', this.formulario.value.favorito);
    c.append('telefone', this.formulario.value.telefone);
    c.append('foto', this.foto);

    this.contatoService
      .save(c)
      .subscribe(response => {
        const lista: Contato[] = [ ... this.contatos, response];
        this.contatos = lista;
      }, errors => {
        console.log(errors);
      });
  }
  openDetalhesModal(contato: Contato): void {
    this.dialog.open( ContatoModalComponent , {
        width: '600px',
       height: '500px',
         data: contato
    });
  }
}
