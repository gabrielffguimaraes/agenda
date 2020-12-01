import { Component, OnInit,HostListener } from '@angular/core';
import { Contato } from './contato';
import { ContatoService } from '../services/contato.service';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ContatoModalComponent } from '../modais/contato-modal/contato-modal.component';
import { Validacoes } from '../Validacoes';
import { ActivatedRoute , Router } from '@angular/router';
import { Location } from '@angular/common';
import { HttpParams } from '@angular/common/http';
import { Base64toFile } from "../Base64toFile";
import { PageEvent } from '@angular/material/paginator';
import { OauthService } from "../services/oauth.service";
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-contato',
  templateUrl: './contato.component.html',
  styleUrls: ['./contato.component.css']
})
export class ContatoComponent implements OnInit {
  foto: any;
  spin : boolean = false;
  spinTable : boolean = false;
  selecionado : number ;
  formulario: FormGroup;
  contatos: Contato[];
  tabActive: number;
  edit: boolean = false;
  colunas: string[] = [
    'foto',
    'nome',
    'email',
    'telefone',
    'favorito',
    'edit'
  ];
  // MatPaginator Inputs
  page = 0;
  pageSize = 10;
  totalElements: number;
  pageSizeOptions: number[] = [5, 10, 25, 100];

  // MatPaginator Output
  pageEvent: PageEvent;
  constructor(
               private oauth: OauthService,
               private dialog: MatDialog,
               private contatoService: ContatoService,
               private formBuilder: FormBuilder,
               private routerParam: ActivatedRoute,
               private location: Location,
               private _route: Router) { }

  @HostListener('window:resize',['$event']) onResize(evt?) {
      const screenCurrentWidth = (evt) ? evt.target.innerWidth : window.innerWidth;
      (screenCurrentWidth <= 700)?this.colunas = ['foto','nome','favorito','edit']:null;
      (screenCurrentWidth > 700 && screenCurrentWidth <= 800 )?this.colunas = ['foto','nome','email','favorito','edit']:null;
      (screenCurrentWidth > 800)?this.colunas = ['foto','nome','email','telefone','favorito','edit']:null;

  }
  ngOnInit(): void {
    this.definirTabs(); // define as tabs pelos parametros passados na url
    this.preparaEditar(this.selecionado);  // define o formulario adicionar/editar pelo id passado na url
    this.montarFormulario(null); // monta o formulario/material
    this.listarContatos(this.page,this.pageSize); // lista todos os contatos
    this.onResize();
  }
  paginar(event: PageEvent): void {
    this.page = event.pageIndex;
    this.pageSize = event.pageSize;
    this.listarContatos(this.page,this.pageSize);
  }
  setPageSizeOptions(setPageSizeOptionsInput: string) {
    if (setPageSizeOptionsInput) {
      this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
    }
  }

  definirTabs() : void{
    this.routerParam.queryParams.subscribe(params => {
      if (params.tab != 1 && params.tab != 2) { // VERIFICA SE TEM ALGUMA TAB ATIVA PELA URL
        this.setTab(0);
      } else {
        this.tabActive = (params.tab - 1); // TAB URL
        this.selecionado = parseInt(params.id)
      }
    });
  }
  preparaAdicionar():void {
    this.clearForm();
  }
  preparaEditar(id : number):void {
    if(id) {
      this.edit = true;
      this.selecionado = id;
      this.contatoService
        .getContatoById(this.selecionado)
        .subscribe(contato => {
          this.montarFormulario(contato);
        }, error => {
          console.log(error);
        });
    }
  }
  montarFormulario(contato:Contato | null): void{
    this.formulario = this.formBuilder.group({
      nome: [(contato) ? contato.nome : "", Validators.required],
      email: [(contato) ? contato.email : "", [Validators.email, Validators.required]],
      favorito: [(contato) ? contato.favorito : false],
      telefone: [(contato) ? contato.telefone : "", Validators.required],
      foto: [ null ]
    });
  }
  listarContatos(page: number,size: number): void {
    this.spinTable = true;
    this.contatoService
      .list(page,size)
      .subscribe( response => {
        this.contatos = response.content;
        this.page = response.number;
        this.totalElements = response.totalElements;
        this.spinTable = false;
      }, errors => {
        this.spinTable = false;
        console.log(errors);
      });
  }
  deletar(): void {
    let confirma = confirm("Deseja realmente excluir este contato ?");
    if(confirma) {
      this.contatoService.erase(this.selecionado).subscribe(response => {
          this.clearForm();
          this.setTab(0);
          this.listarContatos(this.page , this.pageSize);
      }, errors => {
          console.log(errors);
      })
    }
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
  setTab(index: number){
    this.tabActive = index;
    const tab = "?tab="+ (index+1);
    const id = (this.selecionado) ? "&id="+this.selecionado : "";
    this.location.go(`contatos/${tab}${id}`);
  }
  setLoading(contato: Contato, flag: boolean = null): void {
    if (flag) {
      contato.loading = contato.loading === undefined ? false : contato.loading;
    } else {
      contato.loading = !(contato.loading);
    }
  }
  clearForm(): void {
    this.montarFormulario(null);
    this.foto = null;
    this.selecionado = null;
    this.edit = false;
  }
  //ADICIONAR //ALTERAR
  onSubmit(): any {
    const helper = new JwtHelperService();
    /* PAREI AQUI */
    const c: FormData = new FormData();
    c.append('nome', this.formulario.value.nome);
    c.append('email', this.formulario.value.email);
    c.append('favorito', this.formulario.value.favorito);
    c.append('telefone', this.formulario.value.telefone);
    c.append('foto', this.foto);
    c.append('id_usuario', '10');
    switch(this.edit) {
      case false :
        this.spin = true;
        this.contatoService
          .save(c)
          .subscribe(response => {
            //const lista: Contato[] = [...this.contatos, response];
            // this.contatos = lista;
            this.listarContatos(this.page , this.pageSize);
            this.spin = false;
            this.clearForm();
            alert("Incluido com Sucesso");
          }, errors => {
            this.spin = false;
            alert("Erro ao Incluir");
          });
      break;
      case true:
        this.spin = true;
        this.contatoService
          .edit(this.selecionado,c)
          .subscribe(response => {
            this.listarContatos(this.page , this.pageSize);
            this.montarFormulario(response);
            this.spin = false;
            alert("Alterado com Sucesso");
          }, errors => {
            alert("Erro ao Alterar");
          });
        break;
    }
  }
  openDetalhesModal(contato: Contato): void {
    this.dialog.open( ContatoModalComponent , {
        width: '600px',
       height: '500px',
         data: contato
    });
  }
  e(id: string ): any {
    return document.querySelector(id);
  }
  logout(): void {
    this.oauth.logout();
    this._route.navigate(['/']);
  }
}
