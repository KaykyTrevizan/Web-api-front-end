import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Esporte } from '../model/Esporte';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class EsporteService {
  // URL da API de esportes
  private url: string = 'http://localhost:5000/api/esportes';

  constructor(private http: HttpClient) {}

  // Obtém a lista de todos os esportes
  getEsportes(): Observable<Esporte[]> {
    return this.http.get<Esporte[]>(this.url);
  }
  
  // Lista os esportes existentes
  listar(): Observable<Esporte[]> {
    return this.http.get<Esporte[]>(this.url)
      .pipe(
        catchError(this.handleError)
      );
  }

  // Cadastra um novo esporte
  cadastrar(obj: Esporte): Observable<Esporte> {
    return this.http.post<Esporte>(this.url, obj, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  // Altera um esporte existente
  alterar(obj: Esporte): Observable<Esporte> {
    const urlId = `${this.url}/${obj.id}`;
    console.log('URL da requisição:', urlId);

    return this.http.put<Esporte>(urlId, obj)
      .pipe(
        catchError(this.handleError)
      );
  }

  // Apaga um esporte pelo ID
  apagar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }

  // Trata os erros nas requisições HTTP
  private handleError(error: any): Observable<any> {
    console.error('Erro na requisição:', error);
    throw error;
  }
}
