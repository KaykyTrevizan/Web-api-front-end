import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FilmesComponent } from './filmes/filmes.component';
import { SeriesComponent } from './series/series.component';
import { EsportesComponent } from './esportes/esportes.component';
import { UsuariosComponent } from './usuarios/usuarios.component';

const routes: Routes = [
  // Rota para o componente de filmes
  { path: 'filmes', component: FilmesComponent },
  // Rota para o componente de séries
  { path: 'series', component: SeriesComponent },
  // Rota para o componente de esportes
  { path: 'esportes', component: EsportesComponent },
  // Rota para o componente de usuários
  { path: 'usuarios', component: UsuariosComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
