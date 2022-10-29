/** BASE IMPORT */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BasePage } from 'src/app/core/shared/base-page';
/** LIBRERÍAS EXTERNAS IMPORTS */

/** SERVICE IMPORTS */

/** ROUTING MODULE */

/** COMPONENTS IMPORTS */

@Component({
  selector: 'app-pj-c-abandonments',
  templateUrl: './pj-c-abandonments.component.html',
  styleUrls: ['./pj-c-abandonments.component.scss'],
})
export class PJAbandonmentsComponent
  extends BasePage
  implements OnInit, OnDestroy
{
  public form: FormGroup;

  constructor(private fb: FormBuilder) {
    super();
  }

  ngOnInit(): void {
    this.prepareForm();
    this.loading = true;
  }

  private prepareForm() {
    this.form = this.fb.group({
      noBien: '',
      descripcion: '',
      cantidad: '',
      estatus: '',
      clasificacion: '',
      destino: '',
      unidad: '',
    });
  }

  btnAplicaAbandono() {
    console.log('Aplica Abandono');
  }
}
