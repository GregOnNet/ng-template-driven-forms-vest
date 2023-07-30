import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { TodoReadDto } from "./todo-read.dto";
import { Dictionary, toDictionary } from "../../infrastructure";

@Injectable({ providedIn: "root" })
export class TodosClient {
  private readonly http = inject(HttpClient);

  list(): Observable<Dictionary<TodoReadDto>> {
    return this.http
      .get<TodoReadDto[]>("https://jsonplaceholder.typicode.com/todos")
      .pipe(
        map((todos) => {
          const slicedTodos = todos.slice(0, 3);
          return toDictionary(slicedTodos, (todo) => todo.id);
        }),
      );
  }
}
