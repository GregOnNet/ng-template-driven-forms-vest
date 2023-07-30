import { AbstractControl, ValidatorFn } from '@angular/forms';
import { set } from 'lodash';
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

      console.log(modelCopy, control.value, field);

      set(modelCopy, field, control.value);

      // Execute the suite with the model and field
      const result = suite(modelCopy, field);

      // get the errors from our field
      const [suiteError] = result.getErrors(field);

      // expose both an error and errors property
      return suiteError ? { suiteError } : null;
    }
  };
}
