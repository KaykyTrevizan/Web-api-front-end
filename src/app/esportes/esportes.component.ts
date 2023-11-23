import { Component, OnInit } from '@angular/core';
import { Esporte } from '../model/Esporte';
import { FormControl, FormGroup } from '@angular/forms';
import { EsporteService } from '../servico/esporte.service';

@Component({
  selector: 'app-esportes',
  templateUrl: './esportes.component.html',
  styleUrls: ['./esportes.component.css']
})
export class EsportesComponent implements OnInit {
  // Objeto para armazenar informações do esporte atual
  esporte = new Esporte();

  // Variáveis de controle para exibição de botões e tabela
  btnEsportes: boolean = true;
  tabela: boolean = true;

  // Lista de esportes
  esportes: Esporte[] = [];

  constructor(private servico: EsporteService) {}

  // Função para selecionar um esporte da lista
  selecionarEsporte(index: number): void {
    this.esporte = this.esportes[index];
    this.btnEsportes = false;
    this.tabela = false;
  }

  // Função para listar os esportes
  listar(): void {
    this.servico.listar().subscribe(
      (data: Esporte[]) => (this.esportes = data),
      (error: any) => console.error('Erro ao listar esportes', error)
    );
  }

  // Função para cadastrar um novo esporte
  cadastrar(): void {
    this.servico.cadastrar(this.esporte).subscribe(
      (data: Esporte) => {
        this.esportes.push(data);
        this.esporte = new Esporte();
        alert('Esporte cadastrado com sucesso!');
      },
      (error: any) => console.error('Erro ao cadastrar esporte', error)
    );
  }

  // Função para alterar um esporte existente
  alterar(): void {
    this.servico.alterar(this.esporte).subscribe(
      (data: Esporte) => {
        let posicao = this.esportes.findIndex(obj => obj.id == data.id);
        if (posicao !== -1) {
          this.esportes[posicao] = data;
          this.esporte = new Esporte();
          this.btnEsportes = true;
          this.tabela = true;
          alert('Esporte alterado com sucesso!');
          this.listar(); // Atualiza a lista de esportes
        } else {
          console.error('Esporte não encontrado na lista.');
        }
      },
      (error: any) => {
        console.error('Erro ao chamar o serviço de alteração:', error);
      }
    );
  }

  // Função para apagar um esporte
  apagar(): void {
    this.servico.apagar(this.esporte.id).subscribe(data => {
      let posicao = this.esportes.findIndex(obj => obj.id == this.esporte.id);
      this.esportes.splice(posicao, 1);
      this.esporte = new Esporte();
      this.btnEsportes = true;
      this.tabela = true;
      alert('Esporte removido com sucesso!');
    });
  }

  // Função para cancelar a ação atual e limpar o formulário
  cancelar(): void {
    this.esporte = new Esporte();
    this.btnEsportes = true;
    this.tabela = true;
  }

  // Função chamada durante a inicialização do componente para listar os esportes
  ngOnInit() {
    this.listar();
  }
}
