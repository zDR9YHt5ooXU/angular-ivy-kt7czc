import { Component, VERSION } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'my-form',
  templateUrl: './my-form.component.html',
})
export class MyFormComponent  {
  name = 'Angular ' + VERSION.major;
  constructor(private fb: FormBuilder) {

  }
  
}

