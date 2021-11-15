import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.scss']
})
export class TodoFormComponent implements OnInit {
  @Output() getForm = new EventEmitter();
  todoForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.todoForm = this.formBuilder.group({
      label: ['', Validators.required],
      description: ['', Validators.required],
      category: ['', Validators.required],
      done: [false]
    })
  }

  submit(){
    this.getForm.emit({ todoForm: this.todoForm.value });
    this.todoForm.reset();
  }

}
