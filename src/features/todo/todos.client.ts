import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { ReadTodoDto } from "./dto";
import { Dictionary, toDictionary } from "../../infrastructure";

@Injectable({ providedIn: "root" })
export class TodosClient {
  private readonly http = inject(HttpClient);

  list(): Observable<Dictionary<ReadTodoDto>> {
    return this.http
      .get<ReadTodoDto[]>("https://jsonplaceholder.typicode.com/todos")
      .pipe(
        map((todos) => {
          const slicedTodos = todos.slice(0, 3);
          return toDictionary(slicedTodos, (todo) => todo.id);
        }),
      );
  }
}
