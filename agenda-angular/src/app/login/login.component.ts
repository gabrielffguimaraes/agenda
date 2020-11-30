import { Component, OnInit } from '@angular/core';
import { FormGroup , FormBuilder, Validators} from '@angular/forms';
import { Usuario } from './usuario';
import { OauthService } from '../services/oauth.service';
import { Router } from '@angular/router';
import { Validacoes } from '../Validacoes';
import Swal from 'sweetalert2'
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  toast: any;
  formulario: FormGroup;
  spinLogin = false;
  flagCadastro: boolean = false;
  constructor(
              private oauth: OauthService,
              private formBuilder: FormBuilder,
              private router: Router) { }

  ngOnInit(): void
  {
    this.toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 5000,
      timerProgressBar: false,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    })
    this.montarFormulario();
  }
  setState(flag : boolean | null): void
  {
    (!flag) ? this.flagCadastro = !this.flagCadastro : '';
    const u: Usuario = new Usuario();
    u.usuario = this.formulario.value.login;
    u.senha = this.formulario.value.senha;
    u.csenha = this.formulario.value.csenha;
    this.montarFormulario(u);
  }
  onSubmit(): void
  {
    const usuario: Usuario = new Usuario();
    usuario.usuario = this.formulario.value.login;
    usuario.senha = this.formulario.value.senha;
    this.spinLogin = true;
    this.flagCadastro == false ? this.logar(usuario) : this.cadastrar(usuario);  
  }
  cadastrar(usuario: Usuario): void | boolean
  {
      if(this.formulario.get('csenha').value != this.formulario.get('senha').value){
          this.toast.fire({
            icon: 'error',
            title: 'Confirmação de senha invalido'
          })
          this.spinLogin = false;
          return false;
      }
      this.oauth
      .cadastrar(usuario)
      .subscribe(
        success => {
          this.spinLogin = false;
          this.logar(usuario);
        },
        error => {
          this.spinLogin = false;
          this.toast.fire({
            icon: 'error',
            title: error.error.message
          })
        }
      );
  }
  logar (usuario: Usuario): void 
  {
    this.oauth
      .logar(usuario)
      .subscribe(
        tokenObject => {
          this.oauth.setToken(tokenObject);
          this.router.navigate(['/contatos']);
          this.spinLogin = false;
        },
        error => {
          this.spinLogin = false;
          this.toast.fire({
            icon: 'error',
            title: 'Usuário ou senha inválidos'
          })
        }
      );
  }
  montarFormulario(usuario: Usuario | null): void
  {
    this.formulario = this.formBuilder.group(
      {
        login: [(usuario) ? usuario.usuario : '', Validators.required],
        senha: [(usuario) ? usuario.senha : '', [Validators.required]],
        csenha: [(usuario) ? usuario.csenha : '', [this.senhaObrigatoria, this.validarSenhas]]
      }
    );
  }
  
  validarSenhas = (control: FormControl): ValidatorFn => {
     try{
       if ((this.formulario.get('senha').value == this.formulario.get('csenha').value) || this.flagCadastro == false){
         return null;
       }
     }catch(e){
        /*console.log(e)*/
     }

     return { csenhaValida: true };
  }
  senhaObrigatoria = (control: FormControl): ValidatorFn => {
      if (
    ( control.value != null &&
      control.value != undefined &&
      control.value != 'null' &&
      control.value != 'undefined' &&
      control.value != '') ||
      this.flagCadastro == false
    ) {
      return null;
    }
    return { required: true};
  }
}
