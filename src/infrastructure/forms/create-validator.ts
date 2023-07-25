import { AbstractControl, ValidatorFn } from '@angular/forms';
import { lensProp, set } from 'rambda';
import { SuiteResult } from 'vest';

export function createValidator<
  TFieldName extends string,
  TModel extends object
>(
  field: TFieldName,
  model: TModel,
  suite: (model: TModel, field: string) => SuiteResult
): { validate: ValidatorFn } {
  return {
    validate: (control: AbstractControl) => {
      const modelCopy: TModel = { ...model };

      // this is a neat way to update foo.bar.baz in an object
      // Update the property with path
      set(lensProp(field), modelCopy, control.value);

      // Execute the suite with the model and field
      const result = suite(modelCopy, field);

      // get the errors from our field
      const [suiteError] = result.getErrors(field);

      // expose both an error and errors property
      return suiteError ? { suiteError } : null;
    }
  };
}
