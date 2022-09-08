import { Component, VERSION } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'my-form',
  templateUrl: './my-form.component.html',
  styleUrls: ['./my-form.component.css'],
})
export class MyFormComponent {
  name = 'Angular ' + VERSION.major;
  form = this.fb.group({});
  constructor(private fb: FormBuilder) {}
}
