import { Component, OnInit } from '@angular/core';
import {FormGroup,FormBuilder,Validators} from '@angular/forms';
import {Usuario} from './usuario';
import {OauthService} from '../services/oauth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  formulario: FormGroup;
  constructor(private oauth:OauthService,private formBuilder:FormBuilder) { }

  ngOnInit(): void
  {
    this.montarFormulario(null);
  }
  onSubmit(): void
  {
    let usuario: Usuario = new Usuario();
    usuario.usuario = this.formulario.value.login;
    usuario.senha = this.formulario.value.senha;

    this.oauth
      .logar(usuario)
      .subscribe(
        success => {
          console.log(success)
        },
        error => {
          console.log(error)
        }
      )
  }
  montarFormulario(usuario:Usuario | null): void
  {
    this.formulario = this.formBuilder.group(
      {
        login:[(usuario) ? usuario.usuario : ""],
        senha:[(usuario) ? usuario.senha : ""],
        csenha:[""]
      }
    )
  }
}
