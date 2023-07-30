import { provideHttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';

import { AsyncPipe } from '@angular/common';
import 'zone.js';
import { TodosForm } from './features/todo/todos.form';

@Component({
  selector: 'my-app',
  standalone: true,
  imports: [TodosForm, AsyncPipe],
  template: `
    <h1>Template Driven Forms with Vest</h1>

    <todos-form></todos-form>
  `
})
export class App {}

bootstrapApplication(App, { providers: [provideHttpClient()] });
