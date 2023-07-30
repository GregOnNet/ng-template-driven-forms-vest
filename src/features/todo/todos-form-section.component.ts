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
        <!-- @gregorwoiwode You need a track by here to make sure you don't infinite loop -->
        <div
          [ngModelGroup]="todo.key"
          *ngFor="let todo of todos | keyvalue; trackBy: trackById"
        >
          <input type="hidden" [ngModel]="todo.value.id" name="id" />
          <form-suite-field>
            <!-- @gregorwoiwode No more banana in the box -->
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
