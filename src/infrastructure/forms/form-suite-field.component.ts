import { NgFor, NgIf } from '@angular/common';
import { Component, ContentChild, HostBinding, inject } from '@angular/core';
import { NgModel, NgModelGroup } from '@angular/forms';
import { FormSuiteDirective } from './form-suite.directive';

@Component({
  selector: 'form-suite-field',
  standalone: true,
  imports: [NgIf, NgFor],
  template: `
    <ng-content></ng-content>
    <ul
      *ngIf="
        ngModel.control.errors && (form.ngForm.submitted || ngModel.touched)
      "
    >
      <li>
        {{ ngModel.control.errors.suiteError }}
      </li>
    </ul>
    <ng-container
      *ngIf="ngModelGroup && (form.ngForm.submitted || ngModelGroup.touched)"
    >
      <ul *ngIf="ngModelGroup.control?.errors">
        <li *ngFor="let error of ngModelGroup.control.errors?.errors">
          {{ error }}
        </li>
      </ul>
    </ng-container>
  `
})
export class FormSuiteFieldComponent {
  public readonly form = inject(FormSuiteDirective);

  @ContentChild(NgModel) public ngModel!: NgModel;

  public readonly ngModelGroup: NgModelGroup | null = inject(NgModelGroup, {
    optional: true,
    self: true
  });

  @HostBinding('class.invalid') public get invalid() {
    if (
      this.ngModel?.control?.errors &&
      (this.form.ngForm.submitted || this.ngModel.touched)
    ) {
      return true;
    }
    if (
      this.ngModelGroup?.control?.errors &&
      (this.form.ngForm.submitted || this.ngModelGroup.touched)
    ) {
      return true;
    }
    return false;
  }
}
