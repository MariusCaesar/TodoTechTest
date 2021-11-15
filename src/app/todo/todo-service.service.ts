import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { from, Observable, throwError } from 'rxjs';
import { Todo } from './models/Todo';
import { catchError, filter, map, switchMap, toArray } from 'rxjs/operators';
import { NotificationService } from '../notification.service';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private _jsonURL = ' http://localhost:3000/tasks';

  constructor(private http: HttpClient, private notificationService: NotificationService) { }

  // get
  // try and cache results ?
  public getAllTodos() {
    return this.http.get(this._jsonURL).pipe(
      switchMap((todo: Todo[]) => from(todo)),
      map(todo => new Todo({...todo})),
      toArray(),
      catchError(this.handleError)
    )
  }

  // post
  public createTodo(form) {
      const toAdd = new Todo({
        ...form,
        done: false
      });
  
    return this.http.post(this._jsonURL, { ...toAdd })
  }

  // delete
  public deleteTodo(todo: Todo) {
    return this.http.delete(this._jsonURL + '/' + todo.id)
  }

  // update
  public update(todo: Todo) {
    return this.http.put(`${this._jsonURL}/${todo.id}`, todo)
  }


  // get by Id
  public getTodoById(todoId: number) {
    return this.getAllTodos().pipe(
      switchMap((todo: Todo[]) => from(todo)),
      filter(todo => todo.id === todoId),
      catchError(this.handleError)
    )
  }

  private handleError(error: Response | any) {
    console.error('Todo service failed', error);
    this.notificationService.notify(`Error within todo service: ${error}`);
    return throwError(error);
  }

}
