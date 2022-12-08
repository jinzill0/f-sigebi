import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BasePage } from 'src/app/core/shared/base-page';

import { DefaultSelect } from 'src/app/shared/components/select/default-select';
import {
  PGR_PAPERWORK_MAILBOX_COLUMNS,
  PGR_TRANSFERS_COLUMNS,
} from './subject-register-columns';

@Component({
  selector: 'app-subjects-register',
  templateUrl: './subjects-register.component.html',
  styles: [],
})
export class SubjectsRegisterComponent extends BasePage implements OnInit {
  satForm: FormGroup;
  mailboxSettings = {
    ...this.settings,
    columns: { ...PGR_PAPERWORK_MAILBOX_COLUMNS },
  };
  transfersSettings = {
    ...this.settings,
    columns: { ...PGR_TRANSFERS_COLUMNS },
  };
  cordinators = new DefaultSelect();

  constructor(private fb: FormBuilder) {
    super();
  }

  ngOnInit(): void {
    this.prepareForm();
  }

  prepareForm() {
    this.satForm = this.fb.group({
      from: [null],
      to: [null],
      aver: [null],
      cordinador: [null],
      document: [null],
      status: [null],
      pgrGood: [null],
      saeGood: [null],
      saeStatus: [null],
    });
  }
}
