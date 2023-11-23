import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Filme } from '../model/Filme';

// Opções para configuração do cabeçalho HTTP
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class FilmeServiceService {
  // URL base para a API de filmes
  private url: string = 'http://localhost:5000/api/filmes';

  constructor(private http: HttpClient) {}

  // Função para obter todos os filmes
  getFilmes(): Observable<Filme[]> {
    return this.http.get<Filme[]>(this.url);
  }

  // Função para listar filmes
  listar(): Observable<Filme[]> {
    return this.http.get<Filme[]>(this.url).pipe(
      catchError(this.handleError)
    );
  }

  // Função para cadastrar um novo filme
  cadastrar(obj: Filme): Observable<Filme> {
    return this.http.post<Filme>(this.url, obj, httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  // Função para alterar um filme existente
  alterar(obj: Filme): Observable<Filme> {
    // URL completa para a requisição de alteração
    const urlId = `${this.url}/${obj.id}`;
    console.log('URL da requisição:', urlId);

    return this.http.put<Filme>(urlId, obj).pipe(
      catchError(this.handleError)
    );
  }

  // Função para apagar um filme
  apagar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }

  // Função para lidar com erros na requisição HTTP
  private handleError(error: any): Observable<any> {
    console.error('Erro na requisição:', error);
    throw error;
  }
}
