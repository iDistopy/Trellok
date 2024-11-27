import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BoardService {
  constructor(private firestore: AngularFirestore) {}

  // Obtener un tablero por su ID
  async getBoard(boardId: string): Promise<any> {
    const boardRef = this.firestore.collection('boards').doc(boardId);
    const snapshot = await lastValueFrom(boardRef.get());
    
    if (snapshot.exists) {
      return snapshot.data(); // Devuelve solo los datos
    } else {
      throw new Error('El tablero no existe');
    }
  }

  async createBoard(boardName: string, privacity: boolean): Promise<void> {
    if (!boardName.trim()) {
      throw new Error('El nombre del tablero no puede estar vacío');
    }
  
    const boardId = this.firestore.createId();
    await this.firestore.collection('boards').doc(boardId).set({
      name: boardName.trim(),
      privacity: privacity,
      createdAt: new Date(),
    });
  }
  
  
  //Obtener un tablero en específico
  getBoards() {
    return this.firestore
      .collection('boards')
      .valueChanges({ idField: 'id' }); // Devuelve un Observable con el tablero
  }

  // Obtener categorías de un tablero
  getCategories(boardId: string) {
    return this.firestore
      .collection('boards')
      .doc(boardId)
      .collection('categories')
      .valueChanges({ idField: 'id' }); // Devuelve un Observable con las categorías
  }

  // Crear una nueva categoría en un tablero
  async createCategory(boardId: string, categoryName: string): Promise<string> {
    const categoryId = this.firestore.createId();
    const categoriesRef = this.firestore
      .collection('boards')
      .doc(boardId)
      .collection('categories');
  
    await categoriesRef.doc(categoryId).set({
      name: categoryName,
      cards: [],
    });
  
    return categoryId;
  }  

  // Crear una nueva tarjeta en una categoría
  async createCard(boardId: string, categoryId: string, cardName: string) {
    const categoryRef = this.firestore
      .collection('boards')
      .doc(boardId)
      .collection('categories')
      .doc(categoryId);

    const categorySnapshot = await lastValueFrom(categoryRef.get());
    const categoryData: any = categorySnapshot.data();

    const updatedCards = [...(categoryData?.cards || []), { name: cardName }];

    await categoryRef.update({ cards: updatedCards });
  }
}