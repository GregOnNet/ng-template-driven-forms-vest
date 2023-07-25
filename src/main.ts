import { JsonPipe } from '@angular/common';
import { HttpClient, provideHttpClient } from '@angular/common/http';
import { AfterViewInit, Component, DestroyRef, inject, OnInit, ViewChild } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormsModule, NgForm } from '@angular/forms';
import { bootstrapApplication } from '@angular/platform-browser';
import { map, tap } from 'rxjs';
import { create, enforce, only, test } from 'vest';
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
    >
      <todos-form-section [todos]="formModel.todos"></todos-form-section>
    </form>

    <h2>Form Debug</h2>
    <!--- @gregorwoiwode forget the form, use the formmodel -->
    <pre>
    {{ formModel | json }}
    </pre>
  `
})
export class App implements OnInit, AfterViewInit {
  // @gregorwoiwode get access to form to listen to it
  @ViewChild('form') public form!: NgForm;
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

  ngAfterViewInit(): void {
    // @gregorwoiwode listen here and feed the model immutable
    this.form.form.valueChanges.subscribe((v) => {
      this.formModel = {...this.formModel, ...v};
    })
  }

  private createEmptyFormModel(): TodosFormModel {
    return {
      todos: {}
    };
  }

  private createFormSuite() {
    return create('Todo', (model: TodosFormModel, fieldName: string) => {
      only(fieldName);
      // @gregorwoiwode: This seems like a better appraoch than vest.each
      // In other words: this works, the latter doesn't ;-)
      Object.values(model.todos).forEach((entry, key) => {
        console.log('sdf');
        test(`todos.1.title`, 'Please specify a text.', () => {
          console.log('VALIDATING', fieldName, entry.title);
          enforce(entry.title).isNotBlank();
        });
      })
    });
  }
}

bootstrapApplication(App, { providers: [provideHttpClient()] });
