import { Component, VERSION } from '@angular/core';
import { FormBuilder, FormControl, FormRecord } from '@angular/forms';

@Component({
  selector: 'my-form',
  templateUrl: './my-form.component.html',
  styleUrls: ['./my-form.component.css'],
})
export class MyFormComponent {
  // String control
  nameControl = this.fb.control('my-name');

  // Number control
  idControl = this.fb.control(1);

  // Form group with no type and emtpy object
  formWithEmptyObject = this.fb.group({});

  // Form group with type and empty object
  formWithTypedEmptyObject = this.fb.group<{
    name?: string;
    id?: number;
  }>({});

  // From group with inferred type
  formWithInferedType = this.fb.group({
    name: this.nameControl,
    id: this.idControl,
  });

  // Form record with mixed type
  mixedFormRecord = new FormRecord<FormControl<string | number>>({});

  // form record with single type
  singleTypeFormRecord = new FormRecord<FormControl<string>>({});
  constructor(private fb: FormBuilder) {
    // form group without type.
    this.formWithEmptyObject.addControl('name', this.nameControl);
    // form group with type
    this.formWithTypedEmptyObject.addControl('name', this.nameControl);
    this.formWithTypedEmptyObject.addControl('id', this.idControl);
    // form record
    this.mixedFormRecord.addControl('name', this.nameControl);
    this.mixedFormRecord.addControl('id', this.nameControl);
  }

  // BAD formWithEmptyObject.get gives AbstractControl<never, never>
  case1() {
    const nameControl = this.formWithEmptyObject.get('name');
    // nameControl.setValue(1);
  }

  // GOOD, formWithTypedEmptyObject.get gives AbstractControl<string, string>
  case2() {
    const nameControl = this.formWithTypedEmptyObject.get('name');
  }

  // GOOD, control infer type from initial value
  case3() {
    // this.nameControl.setValue(1);
    // this.idControl.setValue('string');
  }

  // BAD, form addControl does not enforce type.
  case4() {
    this.formWithTypedEmptyObject.addControl('id', this.nameControl);
    const idControl = this.formWithTypedEmptyObject.get('id');
    idControl.setValue(1);
  }

  // NEUTRUAL mixed type form record.
  case5() {
    const nameControl = this.mixedFormRecord.get('name');
    nameControl.setValue(1);
    nameControl.setValue(2);
  }

  // GOOD: single type form record limit the type form to add.
  case6() {
    // this.singleTypeFormRecord.addControl('name', this.idControl);
  }

  // GOOD interred type works on formGroup.get
  case7() {
    const nameControl = this.formWithInferedType.get('name');
    const idControl = this.formWithInferedType.get('id');
  }
}
