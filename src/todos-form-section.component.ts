import { KeyValuePipe, NgFor, NgIf } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { connectParentNgForm, provideFormSuite } from './infrastructure';
import { Dictionary } from './infrastructure/to-dictionary';
import { TodoReadDto } from './todo-read.dto';

@Component({
  selector: 'todos-form-section',
  standalone: true,
  imports: [FormsModule, NgFor, NgIf, KeyValuePipe, provideFormSuite()],
  template: `
    <ng-container *ngIf="todos">
      <section ngModelGroup="todos" style="display:grid; gap: 1em">
        <!-- @gregorwoiwode You need a track by here to make sure you don't infinite loop -->
        <div [ngModelGroup]="todo.key" *ngFor="let todo of todos | keyvalue; trackBy: tracker">
          <form-suite-field>
            <!-- @gregorwoiwode No more banana in the box -->
            <input [ngModel]="todo.value.title" name="title" />
          </form-suite-field>
        </div>
      </section>
    </ng-container>
  `,
  viewProviders: [connectParentNgForm]
})
export class TodosFormSectionComponent implements OnInit {
  @Input() todos?: Dictionary<TodoReadDto>;

  tracker = (i: number) => i;

  constructor() {}

  ngOnInit() {}
}
