import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BsModalService } from 'ngx-bootstrap/modal';
import { MODAL_CONFIG } from 'src/app/common/constants/modal-config';
import { BasePage } from 'src/app/core/shared/base-page';
import {
  KEYGENERATION_PATTERN,
  STRING_PATTERN,
} from 'src/app/core/shared/patterns';
import { DefaultSelect } from 'src/app/shared/components/select/default-select';
import { PublicMinistriesComponent } from '../public-ministries/public-ministries.component';

@Component({
  selector: 'app-record-update',
  templateUrl: './record-update.component.html',
  styles: [
    `
      :host ::ng-deep form-radio .form-group {
        margin: 0;
        padding-bottom: -5px;
      }
    `,
  ],
})
export class RecordUpdateComponent extends BasePage implements OnInit {
  public readonly flyerId: number = null;
  flyerForm: FormGroup;
  subjects = new DefaultSelect();

  constructor(
    private fb: FormBuilder,
    private activateRoute: ActivatedRoute,
    private modalService: BsModalService
  ) {
    super();
    const id = this.activateRoute.snapshot.paramMap.get('id');
    if (id) this.flyerId = Number(id);
  }
  ngOnInit(): void {
    this.prepareForm();
  }

  prepareForm() {
    this.flyerForm = this.fb.group({
      noVolante: [this.flyerId, [Validators.required]],
      tipoVolante: ['Administrativo', [Validators.required]],
      fecRecepcion: [null],
      noConsecutivoDiario: [null],
      actaCircust: [null, Validators.pattern(STRING_PATTERN)],
      averiguacionPrevia: [null, Validators.pattern(STRING_PATTERN)],
      causaPenal: [null, Validators.pattern(STRING_PATTERN)],
      cveAmparo: [null, Validators.pattern(KEYGENERATION_PATTERN)],
      cveTocaPenal: [null, Validators.pattern(KEYGENERATION_PATTERN)],
      cveOficioExterno: [null, Validators.pattern(KEYGENERATION_PATTERN)],
      fecOficioExterno: [null],
      observaciones: [null, Validators.pattern(STRING_PATTERN)],
      noExpediente: [null],
      remitenteExterno: [null],
      asunto: [null],
      desahogoAsunto: [null],
      ciudad: [null],
      entidadFed: [null],
      claveUnica: [null],
      transferente: [null],
      emisora: [null],
      autoridad: [null],
      institucion: [null],
      minPub: [null, Validators.pattern(STRING_PATTERN)],
      juzgado: [null],
      indicado: [null],
      delito: [null],
      recepcion: [null],
      area: [null],
      del: [null],
      destinatario: [null, Validators.pattern(STRING_PATTERN)],
      justificacion: [null, Validators.pattern(STRING_PATTERN)],
    });
  }
  publicMinistries() {
    const modalConfig = {
      ...MODAL_CONFIG,
      class: 'modal-dialog-centered',
      initialState: {
        // TODO: Deberia recibir todos los datos para que el formulario sea llenado
        callback: (next: string | number) => {
          // TODO: LLenar el formulario
        },
      },
    };
    this.modalService.show(PublicMinistriesComponent, modalConfig);
  }
}
