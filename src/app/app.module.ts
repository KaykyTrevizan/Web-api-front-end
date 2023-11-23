import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { FilmeServiceService } from './servico/filme-service.service';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { FilmesComponent } from './filmes/filmes.component';
import { SeriesComponent } from './series/series.component';
import { EsportesComponent } from './esportes/esportes.component';
import { UsuariosComponent } from './usuarios/usuarios.component';

import { SerieService } from './servico/serie.service';
import { EsporteService } from './servico/esporte.service';
import { UsuariosService } from './servico/usuario.service';

@NgModule({
  declarations: [
    AppComponent,
    FilmesComponent,
    SeriesComponent,
    EsportesComponent,
    UsuariosComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [HttpClientModule, FilmeServiceService, SerieService, EsporteService, UsuariosService],
  bootstrap: [AppComponent]
})
export class AppModule { }
