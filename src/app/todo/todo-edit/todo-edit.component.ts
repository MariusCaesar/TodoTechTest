import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from 'src/app/notification.service';
import { Todo } from '../models/Todo';
import { TodoService } from '../todo-service.service';

@Component({
  selector: 'app-todo-edit',
  templateUrl: './todo-edit.component.html',
  styleUrls: ['./todo-edit.component.scss']
})
export class TodoEditComponent implements OnInit {
  todo: Todo;
  editTodoForm: FormGroup;

  constructor(
    private activeRoute: ActivatedRoute,
    private router: Router,
    private service: TodoService,
    private formBuilder: FormBuilder,
    private notificationService: NotificationService
  ) { }

  ngOnInit() {
    this.activeRoute.params.subscribe(({ todoId }) => {
      this.service.getTodoById(Number(todoId)).subscribe(todo => {
        this.setupEditForm(todo)
      });
    });
  }

  setupEditForm(todo: Todo) {
    this.editTodoForm = this.formBuilder.group({
      label: [todo.label, Validators.required],
      description: [todo.description, Validators.required],
      category: [todo.category, Validators.required],
      done: [todo.done],
      id: [todo.id]
    })
  }

  save() {
    this.service.update(this.editTodoForm.value).subscribe(() => {
      this.notificationService.notify('Updated Todo');
      this.router.navigate(['/']);
    })
  }

  back() {
    this.router.navigate(['/']);
  }

}
