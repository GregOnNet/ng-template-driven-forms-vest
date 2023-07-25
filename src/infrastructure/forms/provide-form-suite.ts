import { FormSuiteFieldComponent } from './form-suite-field.component';
import { FormSuiteModelGroupDirective } from './form-suite-model-group.directive';
import { FormSuiteModelDirective } from './form-suite-model.directive';
import { FormSuiteDirective } from './form-suite.directive';

export function provideFormSuite() {
  return [
    FormSuiteDirective,
    FormSuiteModelDirective,
    FormSuiteModelGroupDirective,
    FormSuiteFieldComponent
  ];
}
