import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BoardService } from '../services/board.service';

@Component({
  selector: 'app-boards',
  templateUrl: './boards.page.html',
  styleUrls: ['./boards.page.scss'],
})
export class BoardsPage implements OnInit {
  boards: any[] = []; // Aquí guardamos todos los tableros
  boardName: string = ''; // Para crear un nuevo tablero
  privacity: boolean = false;

  constructor(private router: Router, private boardService: BoardService) {}

  async ngOnInit() {
    await this.loadBoards();
  }

  async loadBoards() {
    this.boardService.getBoards().subscribe(boards => {
      console.log('Tableros recuperados:', boards); // Verifica qué datos están llegando
      this.boards = boards;
    });
  }
  
  async addBoard() {
    if (!this.boardName) {
      alert('Por favor ingresa un nombre para el tablero.');
      return;
    }

    try {
      await this.boardService.createBoard(this.boardName, this.privacity); // Crear un nuevo tablero
      this.boardName = '';
      await this.loadBoards();
    } catch (error) {
      console.error('Error al crear el tablero:', error);
    }
  }

  viewBoard(boardId: string) {
    this.router.navigate([`/board/${boardId}`]); // Navegar al detalle del tablero
  }
}
