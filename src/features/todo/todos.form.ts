import { JsonPipe } from "@angular/common";
import { Component, inject, OnInit } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { tap } from "rxjs";
import { provideFormSuite } from "../../infrastructure";
import { TodosFormSectionComponent } from "./todos-form-section.component";
import { TodosClient } from "./todos.client";
import { createEmptyFormModel } from "./todos.form-model";
import { createTodosFormSuite } from "./create-todos-form.suite";

@Component({
  selector: "todos-form",
  standalone: true,
  imports: [
    FormsModule,
    JsonPipe,
    TodosFormSectionComponent,
    provideFormSuite(),
  ],
  template: `
    <form [model]="formModel" [suite]="formSuite">
      <todos-form-section [todos]="formModel.todos"></todos-form-section>
    </form>

    <h2>Form Debug</h2>

    <pre>{{ formModel | json }}</pre>
  `,
})
export class TodosForm implements OnInit {
  private readonly client = inject(TodosClient);

  protected readonly formModel = createEmptyFormModel();
  protected readonly formSuite = createTodosFormSuite();

  ngOnInit(): void {
    this.client
      .list()
      .pipe(tap((todos) => (this.formModel.todos = todos)))
      .subscribe();
  }
}
