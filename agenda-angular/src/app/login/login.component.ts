import { Component, OnInit } from '@angular/core';
import { FormGroup , FormBuilder, Validators} from '@angular/forms';
import { Usuario } from './usuario';
import { OauthService } from '../services/oauth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  formulario: FormGroup;
  spinLogin = false;
  constructor(private oauth: OauthService,
              private formBuilder: FormBuilder,
              private router: Router) { }

  ngOnInit(): void
  {
    this.montarFormulario(null);
  }
  onSubmit(): void
  {
    const usuario: Usuario = new Usuario();
    usuario.usuario = this.formulario.value.login;
    usuario.senha = this.formulario.value.senha;
    this.spinLogin = true;
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
          alert('Usuário ou senha inválidos');
        }
      );
  }
  montarFormulario(usuario: Usuario | null): void
  {
    this.formulario = this.formBuilder.group(
      {
        login: [(usuario) ? usuario.usuario : '', Validators.required],
        senha: [(usuario) ? usuario.senha : '', Validators.required],
        csenha: ['']
      }
    );
  }
}
