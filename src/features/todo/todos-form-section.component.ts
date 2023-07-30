import { KeyValue, KeyValuePipe, NgFor, NgIf } from "@angular/common";
import { Component, Input } from "@angular/core";
import { FormsModule } from "@angular/forms";
import {
  connectParentNgForm,
  Dictionary,
  provideFormSuite,
} from "../../infrastructure";
import { ReadTodoDto } from "./dto";

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
  @Input() todos?: Dictionary<ReadTodoDto>;

  trackById(_index: number, model: KeyValue<string, ReadTodoDto>) {
    return model.value.id;
  }
}
