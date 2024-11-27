import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateBoardPage } from './create-board.page';

describe('CreateBoardPage', () => {
  let component: CreateBoardPage;
  let fixture: ComponentFixture<CreateBoardPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateBoardPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
