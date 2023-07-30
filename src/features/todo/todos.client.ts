import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { TodoReadDto } from './todo-read.dto';

@Injectable({ providedIn: 'root' })
export class TodosClient {
  private readonly http = inject(HttpClient);

  list(): Observable<TodoReadDto[]> {
    return this.http
      .get<TodoReadDto[]>('https://jsonplaceholder.typicode.com/todos')
      .pipe(map(todos => todos.slice(0, 3)));
  }
}
