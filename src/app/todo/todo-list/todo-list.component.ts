import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Todo } from '../models/Todo';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
})
export class TodoListComponent {
  @Input() list: Todo[] = [];
  @Output() deleteTodo = new EventEmitter<Todo>();
  @Output() goToDetail = new EventEmitter<Todo>();
  term = '';

}
