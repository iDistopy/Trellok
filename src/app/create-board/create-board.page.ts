import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BoardService } from '../services/board.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-create-board',
  templateUrl: './create-board.page.html',
  styleUrls: ['./create-board.page.scss'],
})
export class CreateBoardPage {
  boardName: string = '';
  visibility: string = 'private';

  constructor(
    private boardService: BoardService, 
    private router: Router,
    private firestore: AngularFirestore

  ) {}

  async createBoard(boardName: string, visibility: string): Promise<string> {
    const boardData = {
      board_name: boardName,
      visibility: visibility,
      created_date: new Date(),
    };
  
    const boardRef = await this.firestore.collection('boards').add(boardData);
    console.log('Board creado con ID:', boardRef.id);
    this.router.navigate(['/board/'+boardRef.id]);
    return boardRef.id;
  }
  
}
