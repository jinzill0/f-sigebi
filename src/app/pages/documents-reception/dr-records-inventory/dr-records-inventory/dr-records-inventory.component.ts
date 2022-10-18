import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { BasePage } from 'src/app/core/shared/base-page';

@Component({
  selector: 'app-dr-records-inventory',
  templateUrl: './dr-records-inventory.component.html',
  styles: [],
})
export class DrRecordsInventoryComponent extends BasePage implements OnInit {
  form: FormGroup;
  record = new FormControl(null);
  constructor(private fb: FormBuilder) {
    super();
    this.settings = {
      ...this.settings,
      actions: false,
      columns: {
        inventario: {
          title: 'Inventario',
          sort: false,
        },
      },
    };
  }

  ngOnInit(): void {
    this.prepareForm();
  }

  prepareForm() {
    this.form = this.fb.group({
      fecha: [null, [Validators.required]],
      realizo: [null, [Validators.required]],
      anexar: [null, [Validators.required]],
    });
  }
}
