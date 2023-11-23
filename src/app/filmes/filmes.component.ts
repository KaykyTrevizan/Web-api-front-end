import { Component, OnInit } from '@angular/core';
import { Filme } from '../model/Filme';  
import { FormControl, FormGroup } from '@angular/forms';
import { FilmeServiceService } from '../servico/filme-service.service'; 

@Component({
  selector: 'app-filmes',
  templateUrl: './filmes.component.html',
  styleUrls: ['./filmes.component.css']
})
export class FilmesComponent implements OnInit {
  // Objeto para armazenar os dados do filme
  filme = new Filme();
  // Flag para controlar a exibição dos botões na interface
  btnFilmes: boolean = true;
  // Flag para controlar a exibição da tabela na interface
  tabela: boolean = true;
  // Lista de filmes
  filmes: Filme[] = [];

  constructor(private servicoFilme: FilmeServiceService) {}

  // Função para selecionar um filme na tabela
  selecionarFilme(index: number): void {
    this.filme = this.filmes[index];
    this.btnFilmes = false;
    this.tabela = false;
  }

  // Função para listar filmes
  listar(): void {
    this.servicoFilme.listar().subscribe(
      (data: Filme[]) => (this.filmes = data),
      (error: any) => console.error('Erro ao listar filmes', error)
    );
  }

  // Função para cadastrar um novo filme
  cadastrar(): void {
    this.servicoFilme.cadastrar(this.filme).subscribe(
      (data: Filme) => {
        this.filmes.push(data);
        this.filme = new Filme();
        alert('Filme cadastrado com sucesso!');
      },
      (error: any) => console.error('Erro ao cadastrar filme', error)
    );
  }

  // Função para alterar um filme existente
  alterar(): void {
    this.servicoFilme.alterar(this.filme).subscribe(
      (data: Filme) => {
        let posicao = this.filmes.findIndex(obj => obj.id === data.id);
        if (posicao !== -1) {
          this.filmes[posicao] = data;
          this.filme = new Filme();
          this.btnFilmes = true;
          this.tabela = true;
          alert('Filme alterado com sucesso!');
          this.listar();
        } else {
          console.error('Filme não encontrado na lista.');
        }
      },
      (error: any) => {
        console.error('Erro ao chamar o serviço de alteração:', error);
      }
    );
  }

  // Função para apagar um filme
  apagar(): void {
    this.servicoFilme.apagar(this.filme.id).subscribe(data => {
      let posicao = this.filmes.findIndex(obj => obj.id === this.filme.id);
      this.filmes.splice(posicao, 1);
      this.filme = new Filme();
      this.btnFilmes = true;
      this.tabela = true;
      alert('Filme removido com sucesso!');
    });
  }

  // Função para cancelar a operação em andamento
  cancelar(): void {
    this.filme = new Filme();
    this.btnFilmes = true;
    this.tabela = true;
  }

  // Função executada ao inicializar o componente
  ngOnInit() {
    this.listar();
  }
}
