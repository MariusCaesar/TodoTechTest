import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute } from '@angular/router';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoEditComponent } from './todo-edit.component';
import { NotificationService } from 'src/app/notification.service';
import { TodoService } from '../todo-service.service';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

describe('TodoEditComponent', () => {
  let component: TodoEditComponent;
  let fixture: ComponentFixture<TodoEditComponent>;

  const fakeActivatedRoute = {
    params: {
      subscribe: () => of(true)
     }
  } ;

  let testMockTodoService;
  let testMockNotificationService;


  beforeEach(async(() => {
    testMockTodoService = jasmine.createSpyObj(['getAllTodos', 'createTodos', 'deleteTodo']);
    testMockNotificationService = jasmine.createSpyObj(['notify']);
    TestBed.configureTestingModule({
      declarations: [ TodoEditComponent ],
      imports: [RouterTestingModule, HttpClientModule],
      providers: [
        {provide: ActivatedRoute, useValue: fakeActivatedRoute},
        { provide: TodoService, useValue: testMockTodoService },
        { provide: NotificationService, useValue: testMockNotificationService },
        FormBuilder
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
