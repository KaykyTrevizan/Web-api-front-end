import { Component, OnInit } from '@angular/core';
import { Serie } from '../model/Serie';
import { FormControl, FormGroup } from '@angular/forms';
import { SerieService } from '../servico/serie.service';

@Component({
  selector: 'app-series',
  templateUrl: './series.component.html',
  styleUrls: ['./series.component.css']
})
export class SeriesComponent implements OnInit {
  // Objeto para armazenar os dados da série
  serie = new Serie();
  // Flag para controlar a exibição dos botões na interface
  btnSeries: boolean = true;
  // Flag para controlar a exibição da tabela na interface
  tabela: boolean = true;
  // Lista de séries
  series: Serie[] = [];

  constructor(private servicoSerie: SerieService) {}

  // Função para selecionar uma série na tabela
  selecionarSerie(index: number): void {
    this.serie = this.series[index];
    this.btnSeries = false;
    this.tabela = false;
  }

  // Função para listar séries
  listar(): void {
    this.servicoSerie.listar().subscribe(
      (data: Serie[]) => (this.series = data),
      (error: any) => console.error('Erro ao listar séries', error)
    );
  }

  // Função para cadastrar uma nova série
  cadastrar(): void {
    this.servicoSerie.cadastrar(this.serie).subscribe(
      (data: Serie) => {
        this.series.push(data);
        this.serie = new Serie();
        alert('Série cadastrada com sucesso!');
      },
      (error: any) => console.error('Erro ao cadastrar série', error)
    );
  }

  // Função para alterar uma série existente
  alterar(): void {
    this.servicoSerie.alterar(this.serie).subscribe(
      (data: Serie) => {
        let posicao = this.series.findIndex(obj => obj.id === data.id);
        if (posicao !== -1) {
          this.series[posicao] = data;
          this.serie = new Serie();
          this.btnSeries = true;
          this.tabela = true;
          alert('Série alterada com sucesso!');
          this.listar();
        } else {
          console.error('Série não encontrada na lista.');
        }
      },
      (error: any) => {
        console.error('Erro ao chamar o serviço de alteração:', error);
      }
    );
  }

  // Função para apagar uma série
  apagar(): void {
    this.servicoSerie.apagar(this.serie.id).subscribe(data => {
      let posicao = this.series.findIndex(obj => obj.id === this.serie.id);
      this.series.splice(posicao, 1);
      this.serie = new Serie();
      this.btnSeries = true;
      this.tabela = true;
      alert('Série removida com sucesso!');
    });
  }

  // Função para cancelar a operação em andamento
  cancelar(): void {
    this.serie = new Serie();
    this.btnSeries = true;
    this.tabela = true;
  }

  // Função executada ao inicializar o componente
  ngOnInit() {
    this.listar();
  }
}
