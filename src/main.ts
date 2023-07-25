import { JsonPipe } from '@angular/common';
import { HttpClient, provideHttpClient } from '@angular/common/http';
import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { bootstrapApplication } from '@angular/platform-browser';
import { map, tap } from 'rxjs';
import { create, each, enforce, only, test } from 'vest';
import { provideFormSuite, toDictionary } from './infrastructure';
import { TodoReadDto } from './todo-read.dto';
import { TodosFormSectionComponent } from './todos-form-section.component';
import { TodosFormModel } from './todos.form-model';

import 'zone.js';

@Component({
  selector: 'my-app',
  standalone: true,
  imports: [
    FormsModule,
    TodosFormSectionComponent,
    provideFormSuite(),
    JsonPipe
  ],
  template: `
    <h1>Template Driven Forms with Vest</h1>

    <form
      #form="ngForm"
      [model]="formModel"
      [suite]="formSuite"
      [ngFormOptions]="{ updateOn: 'blur' }"
    >
      <todos-form-section [model]="formModel.todos"></todos-form-section>
    </form>

    <h2>Form Debug</h2>
    {{ form.value | json }}
  `
})
export class App implements OnInit {
  private destroyRef = inject(DestroyRef);
  private http = inject(HttpClient);

  formModel = this.createEmptyFormModel();

  formSuite = this.createFormSuite();

  ngOnInit(): void {
    this.http
      .get<TodoReadDto[]>('https://jsonplaceholder.typicode.com/todos')
      .pipe(
        map(todos => todos.slice(0, 1)),
        tap(todos => {
          this.formModel.todos = toDictionary(todos, todo => todo.id);
        }),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe();
  }

  private createEmptyFormModel(): TodosFormModel {
    return {
      todos: {}
    };
  }

  private createFormSuite() {
    return create('Todo', (model: TodosFormModel, fieldName: string) => {
      only(fieldName);

      each(Object.values({ ...model.todos }), entry => {
        test(`todos.${entry.id}.title`, 'Please specify a text.', () => {
          console.log('VALIDATING', fieldName, entry.title);
          enforce(entry.title).isNotBlank();
        });
      });
    });
  }
}

bootstrapApplication(App, { providers: [provideHttpClient()] });
