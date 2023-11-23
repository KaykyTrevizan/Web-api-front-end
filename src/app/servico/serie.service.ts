import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Serie } from '../model/Serie';

// Opções para configuração do cabeçalho HTTP
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class SerieService {
  // URL base para a API de séries
  private url: string = 'http://localhost:5000/api/series';

  constructor(private http: HttpClient) {}

  // Função para obter todas as séries
  getSeries(): Observable<Serie[]> {
    return this.http.get<Serie[]>(this.url);
  }

  // Função para listar séries
  listar(): Observable<Serie[]> {
    return this.http.get<Serie[]>(this.url).pipe(
      catchError(this.handleError)
    );
  }

  // Função para cadastrar uma nova série
  cadastrar(obj: Serie): Observable<Serie> {
    return this.http.post<Serie>(this.url, obj, httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  // Função para alterar uma série existente
  alterar(obj: Serie): Observable<Serie> {
    // URL completa para a requisição de alteração
    const urlId = `${this.url}/${obj.id}`;
    console.log('URL da requisição:', urlId);

    return this.http.put<Serie>(urlId, obj).pipe(
      catchError(this.handleError)
    );
  }

  // Função para apagar uma série
  apagar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }

  // Função para lidar com erros na requisição HTTP
  private handleError(error: any): Observable<any> {
    console.error('Erro na requisição:', error);
    throw error;
  }
}
