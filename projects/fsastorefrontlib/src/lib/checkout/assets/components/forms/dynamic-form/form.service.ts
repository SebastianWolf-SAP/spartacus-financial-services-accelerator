import { Injectable } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FieldConfig } from './models/field-config.interface';

@Injectable()

export class FSFormService {

  constructor(private fb: FormBuilder) { }

  form = this.fb.group({});
  newGroup;
  groupName;

  createForm(config) {
    config.formGroups.forEach(formGroup => {
      this.newGroup = this.fb.group({});
      this.groupName = formGroup.groupName;
      formGroup.fieldConfigs.forEach(input => {
        input.group = this.newGroup;
        this.newGroup.addControl(input.name, this.createControl(input));
      });
      this.form.addControl(this.groupName, this.newGroup);
    });
    return this.form;
  }

  createControl(config: FieldConfig) {
    const { disabled, validation, value } = config;
    return this.fb.control({ disabled, value }, validation);
  }
}
