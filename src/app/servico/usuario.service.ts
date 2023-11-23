import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Usuario } from '../model/Usuario';

// Opções para configuração do cabeçalho HTTP
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  // URL base para a API de usuários
  private url: string = 'http://localhost:5000/api/usuarios';

  constructor(private http: HttpClient) {}

  // Função para listar todos os usuários
  listar(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.url).pipe(
      catchError(this.handleError)
    );
  }

  // Função para cadastrar um novo usuário
  cadastrar(obj: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(this.url, obj, httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  // Função para alterar um usuário existente
  alterar(obj: Usuario): Observable<Usuario> {
    // URL completa para a requisição de alteração
    const urlId = `${this.url}/${obj.id}`;
    console.log('URL da requisição:', urlId);

    return this.http.put<Usuario>(urlId, obj).pipe(
      catchError(this.handleError)
    );
  }

  // Função para apagar um usuário
  apagar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }

  // Função para lidar com erros na requisição HTTP
  private handleError(error: any): Observable<any> {
    console.error('Erro na requisição:', error);
    throw error;
  }
}
