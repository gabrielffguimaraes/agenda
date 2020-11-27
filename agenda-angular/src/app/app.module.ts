import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ContatoComponent } from './contato/contato.component';
import { ContatoService } from './services/contato.service.js';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { AnimationsComponent } from './animations/animations.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule} from '@angular/material/card';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialogModule } from '@angular/material/dialog';
import { ContatoModalComponent } from './modais/contato-modal/contato-modal.component';
import {MatPaginatorModule} from '@angular/material/paginator';
import { LoginComponent } from './login/login.component';
import {OauthService} from './services/oauth.service';
import {TokenInterceptor} from './services/token.interceptor';
@NgModule({
  declarations: [
    AppComponent,
    ContatoComponent,
    AnimationsComponent,
    ContatoModalComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatToolbarModule,
    MatInputModule,
    MatIconModule,
    MatFormFieldModule,
    MatTabsModule,
    MatTableModule,
    MatCardModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,
    MatDialogModule
  ],
  providers: [ContatoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
