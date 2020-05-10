import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { YFormData } from '@fsa/dynamicforms';
import { Observable, Subscription, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { DynamicFormsConfig } from '../../config/form-config';
import { GeneralHelpers } from '../../helpers/helpers';
import { FormDefinition } from '../../models/form-config.interface';
import { FormBuilderService } from '../../services/builder/form-builder.service';
import { FormDataService } from '../../services/data/form-data.service';

@Component({
  exportAs: 'cx-dynamicForm',
  selector: 'cx-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DynamicFormComponent implements OnInit, OnDestroy {
  @Input()
  formData: Observable<YFormData>;
  @Input()
  config: FormDefinition;
  @Output()
  submit: EventEmitter<any> = new EventEmitter<any>();

  form: FormGroup;
  subscription = new Subscription();

  submittedSub = new BehaviorSubject<boolean>(true);
  submitted$: Observable<boolean> = this.submittedSub.asObservable();

  get changes() {
    return this.form.valueChanges;
  }
  get valid() {
    return this.form.valid;
  }
  get value() {
    return this.form.value;
  }

  constructor(
    protected formService: FormBuilderService,
    protected formDataService: FormDataService,
    public formConfig: DynamicFormsConfig
  ) {}

  ngOnInit() {
    if (this.config) {
      this.form = this.formService.createForm(this.config);
    }
    this.addSubmitEvent();
    if (this.formData) {
      this.subscription.add(
        this.formData
          .pipe(
            map(formData => {
              if (formData.content) {
                this.mapDataToFormControls(JSON.parse(formData.content));
              }
            })
          )
          .subscribe()
      );
    }
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  mapDataToFormControls(formData) {
    for (const groupCode of Object.keys(formData)) {
      if (GeneralHelpers.getObjectDepth(formData) === 1) {
        this.form.get(groupCode).setValue(formData[groupCode]);
      } else {
        for (const controlName of Object.keys(formData[groupCode])) {
          const formGroup = this.form.get(groupCode);
          if (formGroup && formGroup.get(controlName)) {
            formGroup
              .get(controlName)
              .setValue(formData[groupCode][controlName]);
          }
        }
      }
    }
  }

  addSubmitEvent() {
    this.subscription.add(
      this.formDataService
        .getSubmittedForm()
        .pipe(
          map(form => {
            console.log(this.form);
            if (form && !this.valid) {
              this.submittedSub.next(true);
              this.markInvalidControls(this.form);
            } else if (
              form &&
              form.content === undefined &&
              this.form &&
              this.value !== undefined &&
              this.valid
            ) {
              this.submittedSub.next(false);
              this.submit.emit({
                id: form.id,
                refId: form.refId,
                content: this.value,
              });
            }
          })
        )
        .subscribe()
    );
  }

  markInvalidControls(formGroup) {
    for (const key of Object.keys(formGroup.controls)) {
      const formControl = formGroup.get(key);
      if (formControl instanceof FormGroup) {
        this.markInvalidControls(formControl);
      } else {
        const control = <FormControl>formControl;
        if (!control.valid) {
          control.markAsTouched({ onlySelf: true });
        }
      }
    }
  }
}
