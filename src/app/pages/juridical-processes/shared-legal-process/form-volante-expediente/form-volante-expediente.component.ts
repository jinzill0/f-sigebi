import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';  
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BasePage } from 'src/app/core/shared/base-page';

@Component({
  selector: 'ngx-form-volante-expediente',
  templateUrl: './form-volante-expediente.component.html',
  styleUrls: ['./form-volante-expediente.component.scss']
})
export class FormVolanteExpedienteComponent extends BasePage implements OnInit{
    @Input() form: FormGroup;
    @Input() nombrePantalla: string;

  public optionsTipoVolante = [
    { value: 'Administrativo', label: 'Administrativo' },
    { value: 'Procesal', label: 'Procesal' },
    { value: 'Admin. Trans', label: 'Admin. Trans' },
    { value: 'Transferente', label: 'Transferente' },
  ];
  public botonOficio = false;
  public botonCaptura = false;

//   public form: FormGroup;
@Output() formValues = new EventEmitter<any>();
@Output() oficioRelacionadoEvent = new EventEmitter<any>();
@Output() capturaCopiasEvent = new EventEmitter<any>();
  constructor() {  
    super();
  }

  ngOnInit(): void {
  }
  
mostrarInfo(): any{
  console.log(this.form.value);
  this.formValues.emit(this.form);
}

oficioRelacionado() {
    console.log("Oficio Relacionado");
    this.oficioRelacionadoEvent.emit(true);
}

capturaCopias() {
    console.log("Captura copias");
    this.capturaCopiasEvent.emit(true);
}

/**
 * Formulario
 */
// public returnField(field) { return this.form.get(field); }
// public returnShowRequirements(field) { return this.returnField(field)?.errors?.required && this.returnField(field).touched; }

}
