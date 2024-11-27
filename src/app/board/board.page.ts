import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BoardService } from '../services/board.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.page.html',
  styleUrls: ['./board.page.scss'],
})
export class BoardPage implements OnInit {
  boardId: string = '';
  boardName: string = 'Cargando...';
  categories: any[] = [];
  isAddingCategory: boolean = false;
  categoryName: string = '';

  constructor(private route: ActivatedRoute, private boardService: BoardService) {}

  async ngOnInit() {
    this.boardId = this.route.snapshot.paramMap.get('id') || '';
    await this.loadBoard();
    await this.loadCategories();
  }

  async loadBoard() {
    try {
      const boardData = await this.boardService.getBoard(this.boardId);
      this.boardName = boardData?.name || 'Sin Nombre';
    } catch (error) {
      console.error('Error al cargar el tablero:', error);
      this.boardName = 'Error al cargar';
    }
  }  

  async loadCategories() {
    this.boardService.getCategories(this.boardId).subscribe((categories) => {
      // Si las categorías tienen tarjetas en el backend, se asignan aquí
      this.categories = categories.map((category) => ({
        ...category,
        cards: category['cards'] || [],
      }));
    });
  }  

  async addCard(categoryId: string) {
    const cardName = prompt('Nombre de la tarjeta:'); // Abre un prompt para ingresar el nombre
    if (!cardName) {
      return; // Si no se ingresa un nombre, no hace nada
    }
  
    try {
      await this.boardService.createCard(this.boardId, categoryId, cardName); // Crea la tarjeta
      await this.loadCategories(); // Recarga las categorías
    } catch (error) {
      console.error('Error al crear tarjeta:', error); // Muestra cualquier error
    }
  }  

  startAddingCategory() {
    this.isAddingCategory = true; // Activa el modal
    this.categoryName = ''; // Limpia el campo
  }

  cancelAddingCategory() {
    this.isAddingCategory = false; // Cierra el modal
    this.categoryName = ''; // Limpia el campo
  }
  
  async saveCategory() {
    if (!this.categoryName.trim()) {
      alert('Por favor ingresa un nombre para la categoría.');
      return;
    }
  
    try {
      // Crear la categoría en la base de datos
      await this.boardService.createCategory(this.boardId, this.categoryName);
  
      // Recargar las categorías
      await this.loadCategories();
  
      // Cerrar el modal
      this.isAddingCategory = false;
      this.categoryName = '';
  
      // Forzar el scroll hacia la última categoría añadida
      setTimeout(() => {
        const carousel = document.querySelector('.categories-carousel');
        if (carousel) {
          carousel.scrollLeft = carousel.scrollWidth; // Llevar el scroll al final
        }
      }, 100); // Un pequeño retraso para asegurar que la categoría fue renderizada
  
    } catch (error) {
      console.error('Error al añadir categoría:', error);
    }
  }   
}