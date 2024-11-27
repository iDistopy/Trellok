import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BoardsPage } from './boards.page';

describe('BoardsPage', () => {
  let component: BoardsPage;
  let fixture: ComponentFixture<BoardsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(BoardsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
