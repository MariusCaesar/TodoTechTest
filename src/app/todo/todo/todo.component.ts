import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { NotificationService } from 'src/app/notification.service';
import { Todo } from '../models/Todo';
import { TodoService } from '../todo-service.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {
  tasks$: Observable<Todo[]> ;

  constructor(
    private todoService: TodoService,
    private router: Router,
    private notificationService: NotificationService
    ) { }

  ngOnInit() {
    this.tasks$ = this.todoService.getAllTodos();
  }

  createTodos(form) {
    this.todoService.createTodo(form.todoForm).subscribe(() => {
      this.notificationService.notify('Successfully Created new todo');
      this.tasks$ = this.todoService.getAllTodos();
    });
  }

  deleteTodo(todo: Todo) {
    this.todoService.deleteTodo(todo).subscribe(() => {
      this.notificationService.notify('Successfully Deleted todo');
      this.refreshTodos();
    });
  }

  private refreshTodos() {
    this.tasks$ = this.todoService.getAllTodos();
  }

  goToDetail(todoId: number) {
    this.router.navigate([`todo/${todoId}`]);
  }

}
