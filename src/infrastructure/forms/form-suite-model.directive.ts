import { Directive, inject } from "@angular/core";
import {
  AbstractControl,
  NG_VALIDATORS,
  ValidationErrors,
  Validator,
} from "@angular/forms";
import { createValidator } from "./create-validator";
import { FormSuiteDirective } from "./form-suite.directive";
import { getControlPath } from "./get-control-path";

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: "[ngModel]",
  standalone: true,
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: FormSuiteModelDirective,
      multi: true,
    },
  ],
})
export class FormSuiteModelDirective implements Validator {
  private readonly formDirective = inject(FormSuiteDirective);

  public validate(control: AbstractControl): ValidationErrors | null {
    const { ngForm, suite, model } = this.formDirective;

    if (!suite) {
      return null;
    }

    const formGroup = control.parent?.controls;

    if (!formGroup) {
      throw new Error("No FromGroup has been found");
    }

    const controlName =
      Object.keys(formGroup).find(
        (name: string) => control === control.parent?.get(name),
      ) || "";

    const fieldName = getControlPath(ngForm.control, controlName, control);

    if (!fieldName) {
      return null;
    }

    const validator = createValidator(fieldName, model, suite);

    return validator.validate(control);
  }
}
