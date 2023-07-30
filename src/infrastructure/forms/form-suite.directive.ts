import {
  AfterViewInit,
  DestroyRef,
  Directive,
  inject,
  Input,
} from "@angular/core";
import { NgForm } from "@angular/forms";
import { Suite } from "vest";
import { distinctUntilChanged, tap } from "rxjs";
import { merge } from "lodash";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";

@Directive({
  // make sure it has a model and suite
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: "form[model]",
  standalone: true,
})
export class FormSuiteDirective<TModel> implements AfterViewInit {
  private readonly destroyRef = inject(DestroyRef);

  @Input() public model!: TModel;
  @Input() public suite: Suite<(...args: any[]) => void> | undefined;

  // expose ngForm, we need it in our child directives/components
  public readonly ngForm = inject(NgForm, { self: true });

  ngAfterViewInit(): void {
    this.updateFormModelOnFormValueChanges();
  }

  /**
   * Whenever a value changes we update the formModel,
   * that passes its updated values down dot the form-sections.
   *
   * That's why we do not need (ngModelChange) in a form-section, because
   * it is fed by the parent formModel (unidirectional data-flow).
   */
  private updateFormModelOnFormValueChanges() {
    this.ngForm?.form.valueChanges
      .pipe(
        distinctUntilChanged(),
        tap((valueChanged) => merge(this.model, valueChanged)),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe();
  }
}
