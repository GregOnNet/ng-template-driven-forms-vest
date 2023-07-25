import { Directive, inject, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Suite } from 'vest';

@Directive({
  // make sure it has a model and suite
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: 'form[model]',
  standalone: true
})
export class FormSuiteDirective<TModel> {
  @Input() public model!: TModel;
  @Input() public suite: Suite<(...args: any[]) => void> | undefined;

  // expose ngForm, we need it in our child directives/components
  public readonly ngForm = inject(NgForm, { self: true });
}
