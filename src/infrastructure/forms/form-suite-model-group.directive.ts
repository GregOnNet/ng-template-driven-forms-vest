import { Directive, inject } from '@angular/core';
import {
  AbstractControl,
  NG_VALIDATORS,
  ValidationErrors,
  Validator,
} from '@angular/forms';
import { createValidator } from './create-validator';
import { getControlPath } from './get-control-path';
import { FormSuiteDirective } from './form-suite.directive';

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: '[ngModelGroup]',
  standalone: true,
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: FormSuiteModelGroupDirective,
      multi: true,
    },
  ],
})
export class FormSuiteModelGroupDirective implements Validator {
  private readonly formDirective = inject(FormSuiteDirective);

  public validate(control: AbstractControl): ValidationErrors | null {
    const { ngForm, suite } = this.formDirective;

    if (!suite) {
      return null;
    }

    const formGroup = control.parent?.controls;

    if (!formGroup) {
      throw new Error('No FromGroup has been found');
    }

    const controlName =
      Object.keys(formGroup).find(
        (name: string) => control === control.parent?.get(name)
      ) || '';

    const fieldName = getControlPath(ngForm.control, controlName, control);

    if (!fieldName) {
      return null;
    }

    const validator = createValidator(
      fieldName,
      this.formDirective.model,
      suite
    );

    const result = validator.validate(control);

    return result;
  }
}
