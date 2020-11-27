import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContatoComponent } from './contato/contato.component';
import {LoginComponent} from './login/login.component';

const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'contatos', component: ContatoComponent},
  {path: '**', redirectTo: '', pathMatch: 'full' }
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
