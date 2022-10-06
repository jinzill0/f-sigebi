import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-pe-rdde-c-daily-control-reception',
  templateUrl: './pe-rdde-c-daily-control-reception.component.html',
  styles: [
  ]
})
export class PeRddeCDailyControlReceptionComponent implements OnInit {

  form: FormGroup = new FormGroup({}); 

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.prepareForm();
  }

  private prepareForm() {
    this.form = this.fb.group({
      delegation: ['', [Validators.required]],
      subDelegation: ['', [Validators.required]],
      fromYear: ['', [Validators.required]],
      fromMonth: ['', [Validators.required]],
    });
  }


}
