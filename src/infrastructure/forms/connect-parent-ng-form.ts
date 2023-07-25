import { ControlContainer, NgForm } from '@angular/forms';

/*
 * Allows child component to connect to NgForm of a parent component.
 * Reference: https://youtu.be/CD_t3m2WMM8?t=1826
 */
export const connectParentNgForm = {
  provide: ControlContainer,
  useExisting: NgForm,
};
