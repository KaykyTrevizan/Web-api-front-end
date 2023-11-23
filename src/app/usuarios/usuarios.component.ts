import { Component, OnInit } from '@angular/core';
import { Usuario } from '../model/Usuario';
import { FormControl, FormGroup } from '@angular/forms';
import { UsuariosService } from '../servico/usuario.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {
  // Objeto para armazenar os dados do usuário
  usuario = new Usuario();
  // Flag para controlar a exibição dos botões na interface
  btnUsuarios: boolean = true;
  // Flag para controlar a exibição da tabela na interface
  tabela: boolean = true;
  // Lista de usuários
  usuarios: Usuario[] = [];

  constructor(private servicoUsuario: UsuariosService) {}

  // Função para selecionar um usuário na tabela
  selecionarUsuario(index: number): void {
    this.usuario = this.usuarios[index];
    this.btnUsuarios = false;
    this.tabela = false;
  }

  // Função para listar usuários
  listar(): void {
    this.servicoUsuario.listar().subscribe(
      (data: Usuario[]) => (this.usuarios = data),
      (error: any) => console.error('Erro ao listar usuários', error)
    );
  }

  // Função para cadastrar um novo usuário
  cadastrar(): void {
    this.servicoUsuario.cadastrar(this.usuario).subscribe(
      (data: Usuario) => {
        this.usuarios.push(data);
        this.usuario = new Usuario();
        alert('Usuário cadastrado com sucesso!');
      },
      (error: any) => console.error('Erro ao cadastrar usuário', error)
    );
  }

  // Função para alterar um usuário existente
  alterar(): void {
    this.servicoUsuario.alterar(this.usuario).subscribe(
      (data: Usuario) => {
        let posicao = this.usuarios.findIndex(obj => obj.id === data.id);
        if (posicao !== -1) {
          this.usuarios[posicao] = data;
          this.usuario = new Usuario();
          this.btnUsuarios = true;
          this.tabela = true;
          alert('Usuário alterado com sucesso!');
          this.listar();
        } else {
          console.error('Usuário não encontrado na lista.');
        }
      },
      (error: any) => {
        console.error('Erro ao chamar o serviço de alteração:', error);
      }
    );
  }

  // Função para apagar um usuário
  apagar(): void {
    this.servicoUsuario.apagar(this.usuario.id).subscribe(data => {
      let posicao = this.usuarios.findIndex(obj => obj.id === this.usuario.id);
      this.usuarios.splice(posicao, 1);
      this.usuario = new Usuario();
      this.btnUsuarios = true;
      this.tabela = true;
      alert('Usuário removido com sucesso!');
    });
  }

  // Função para cancelar a operação em andamento
  cancelar(): void {
    this.usuario = new Usuario();
    this.btnUsuarios = true;
    this.tabela = true;
  }

  // Função executada ao inicializar o componente
  ngOnInit() {
    this.listar();
  }
}
