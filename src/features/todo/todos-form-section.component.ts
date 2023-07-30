import { KeyValue, KeyValuePipe, NgFor, NgIf } from "@angular/common";
import { Component, Input } from "@angular/core";
import { FormsModule } from "@angular/forms";
import {
  Dictionary,
  connectParentNgForm,
  provideFormSuite,
} from "../../infrastructure";
import { TodoReadDto } from "./todo-read.dto";

@Component({
  selector: "todos-form-section",
  standalone: true,
  imports: [FormsModule, NgFor, NgIf, KeyValuePipe, provideFormSuite()],
  template: `
    <ng-container *ngIf="todos">
      <section ngModelGroup="todos" style="display:grid; gap: 1em">
        <div
          [ngModelGroup]="todo.key"
          *ngFor="let todo of todos | keyvalue; trackBy: trackById"
        >
          <form-suite-field>
            <input [ngModel]="todo.value.title" name="title" />
          </form-suite-field>
        </div>
      </section>
    </ng-container>
  `,
  viewProviders: [connectParentNgForm],
})
export class TodosFormSectionComponent {
  @Input() todos?: Dictionary<TodoReadDto>;

  trackById(_index: number, model: KeyValue<string, TodoReadDto>) {
    return model.value.id;
  }
}
