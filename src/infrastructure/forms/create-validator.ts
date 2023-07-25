import { AbstractControl, ValidatorFn } from '@angular/forms';
import { SuiteResult } from 'vest';
// @gregorwoiwoide: I used lodash, the other one failed
import { set } from 'lodash';

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
      // this is a neat way to update foo.bar.baz in an object
      // Update the property with path
      // @gregorwoiwode: your set didn't work, causing the delay every time,
      // it was not properly updating references
      set(modelCopy, field, control.value); // Update the property with path

      // Execute the suite with the model and field
      const result = suite(modelCopy, field);

      // get the errors from our field
      const [suiteError] = result.getErrors(field);

      // expose both an error and errors property
      return suiteError ? { suiteError } : null;
    }
  };
}
