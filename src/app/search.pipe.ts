import { Pipe, PipeTransform } from '@angular/core';
import { Todo } from './todo/models/Todo';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(values: Todo[], args: string): any {
    if (!args.length) {
      return values;
    }

    return values.filter((todo: Todo) => {
      return todo.label.toLocaleLowerCase().includes(args.toLowerCase());
    })

  }

}
