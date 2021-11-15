import { MatChipsModule } from '@angular/material/chips';
import { SearchPipe } from './../../search.pipe';
import { FormsModule } from '@angular/forms';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoListComponent } from './todo-list.component';
import { Todo } from '../models/Todo';
import { By } from '@angular/platform-browser';

describe('TodoListComponent', () => {
  let component: TodoListComponent;
  let fixture: ComponentFixture<TodoListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TodoListComponent, SearchPipe],
      imports: [
        FormsModule,
        MatChipsModule
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    component.list = [
      new Todo({
        "label": "Testing testing",
        "description": "Gotta write some tests",
        "category": "saab",
        "done": true,
        "id": 5
      }),
      new Todo({
        "label": "sdsd",
        "description": "sdsd",
        "category": "bureaucracy",
        "done": false,
        "id": 6
      }),
      new Todo({
        "label": "Adding something new",
        "description": "Hobbs and shaw is awesome",
        "category": "bureaucracy",
        "done": false,
        "id": 7
      })]
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display list of todos', () => {
    fixture.detectChanges();

    const card = fixture.debugElement.nativeElement.querySelectorAll('.todo');

    expect(card.length).toBe(3);
  });



});
