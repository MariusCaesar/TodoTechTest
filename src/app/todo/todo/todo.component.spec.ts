import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { TodoListComponent } from './../todo-list/todo-list.component';
import { TodoFormComponent } from './../todo-form/todo-form.component';
import { NotificationService } from 'src/app/notification.service';
import { Todo } from './../models/Todo';
import { TodoService } from './../todo-service.service';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TodoComponent } from './todo.component';
import { of } from 'rxjs';

describe('TodoComponent', () => {
  let component: TodoComponent;
  let fixture: ComponentFixture<TodoComponent>;

  const mockTodoService = {
    createTodo: () => {
      of(true)
    },
    getAllTodos: () => {
      const mockTodos = [
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
        })
      ]
      return mockTodos;
    },
    deleteTodo: () => {
      of(true)
    }
  }
  let testMockTodoService;
  let testMockNotificationService;


  beforeEach(async(() => {
    testMockTodoService = jasmine.createSpyObj(['getAllTodos', 'createTodos', 'deleteTodo']);
    testMockNotificationService = jasmine.createSpyObj(['notify'])

    TestBed.configureTestingModule({
      declarations: [ TodoComponent, TodoFormComponent, TodoListComponent ],
      imports: [
        HttpClientModule,
        RouterTestingModule,
        ReactiveFormsModule,
        FormsModule
      ],
      providers: [
        { provide: TodoService, useValue: testMockTodoService},
        { provide: NotificationService, useValue: testMockNotificationService},
        FormBuilder
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
