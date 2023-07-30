import { JsonPipe } from "@angular/common";
import {
  AfterViewInit,
  Component,
  OnInit,
  ViewChild,
  inject,
} from "@angular/core";
import { FormsModule, NgForm } from "@angular/forms";
import { distinctUntilChanged, tap } from "rxjs";
import { create, each, enforce, only, test } from "vest";
import { provideFormSuite, toDictionary } from "../../infrastructure";
import { TodosFormSectionComponent } from "./todos-form-section.component";
import { TodosClient } from "./todos.client";
import { TodosFormModel } from "./todos.form-model";
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
export class TodosForm implements OnInit, AfterViewInit {
  private readonly client = inject(TodosClient);

  @ViewChild(NgForm) protected ngForm?: NgForm;

  protected formModel = this.createEmptyFormModel();
  protected formSuite = createTodosFormSuite();

  ngOnInit(): void {
    this.client
      .list()
      .pipe(
        tap(
          (todos) =>
            (this.formModel.todos = toDictionary(todos, (todo) => todo.id)),
        ),
      )
      .subscribe();
  }

  ngAfterViewInit(): void {
    this.updateFormModelOnFormValueChanges();
  }

  /**
   * Whenever a value changes we update the formModel,
   * that passes its updated values down dot the form-sections.
   *
   * That's why we do not need (ngModelChange) in a form-section, because
   * it is fed by the parent formModel (unidirectional data-flow).
   */
  private updateFormModelOnFormValueChanges() {
    this.ngForm?.form.valueChanges
      .pipe(distinctUntilChanged())
      .subscribe((valueChanged) => {
        console.log("VALUE CHANGED", valueChanged);
        this.formModel = { ...this.formModel, ...valueChanged };
      });
  }

  private createEmptyFormModel(): TodosFormModel {
    return {
      todos: {},
    };
  }
}
