import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { BehaviorSubject } from 'rxjs';
import { ListParams } from 'src/app/common/repository/interfaces/list-params';
import {
  IComerLayouts,
  IL,
} from 'src/app/core/models/ms-parametercomer/parameter';
import { LayoutsConfigService } from 'src/app/core/services/ms-parametercomer/layouts-config.service';
import { BasePage } from 'src/app/core/shared/base-page';
import { STRING_PATTERN } from 'src/app/core/shared/patterns';

@Component({
  selector: 'app-publication-photographs-modal',
  templateUrl: './publication-photographs-modal.component.html',
  styles: [],
})
export class PublicationPhotographsModalComponent
  extends BasePage
  implements OnInit
{
  title: string = 'Fotografías';
  provider: any;
  params = new BehaviorSubject<ListParams>(new ListParams());
  totalItems: number = 0;
  edit: boolean = false;
  structureLayoutSelected: any;
  providerForm: FormGroup = new FormGroup({});
  id: number = 0;
  layoutsT: IComerLayouts;
  layout: IL;
  layoutList: IComerLayouts[] = [];
  @Output() onConfirm = new EventEmitter<any>();
  @Input() structureLayout: any;

  constructor(
    private modalRef: BsModalRef,
    private fb: FormBuilder,
    private layoutsConfigService: LayoutsConfigService
  ) {
    super();
  }
  ngOnInit(): void {
    this.prepareForm();
    this.structureLayoutSelected = this.structureLayout;
    // this.inpuLayout = this.idLayout.toString().toUpperCase();
    console.log(this.structureLayoutSelected);
  }

  private prepareForm(): void {
    this.providerForm = this.fb.group({
      idLayout: [null],
      idConsec: [null],
      position: [
        null,
        [Validators.required, Validators.pattern(STRING_PATTERN)],
      ],
      column: [null, [Validators.required, Validators.pattern(STRING_PATTERN)]],
      // mes: [null, [Validators.required, Validators.pattern(STRING_PATTERN)]],
      type: [null, [Validators.required]],
      length: [new Date()],
      constant: [null, [Validators.required]],
      carFilling: [null, [Validators.required]],
      justification: [null, [Validators.required]],
      decimal: [null, [Validators.required]],
      dateFormat: [null, [Validators.required]],
      registryNumber: [null, [Validators.required]],
    });
    if (this.provider !== undefined) {
      this.edit = true;
      this.providerForm.patchValue(this.provider);
    } else {
      this.edit = false;
    }
  }

  close() {
    this.modalRef.hide();
  }

  confirm() {
    this.edit ? this.update() : this.create();
  }

  create() {
    try {
      this.loading = false;
      this.layoutsConfigService.create(this.structureLayout).subscribe({
        next: data => this.handleSuccess(),
        error: error => {
          this.loading = false;
          this.onLoadToast('error', 'No se puede duplicar layout!!', '');
          return;
        },
      });
    } catch {
      console.error('Layout no existe');
    }
  }
  update() {
    this.alertQuestion(
      'warning',
      'Actualizar',
      'Desea actualizar este layout?'
    ).then(question => {
      if (question.isConfirmed) {
        this.layoutsConfigService
          .update(this.provider.id, this.providerForm.value)
          .subscribe({
            next: data => this.handleSuccess(),
            error: error => {
              this.onLoadToast('error', 'layout', '');
              this.loading = false;
            },
          });
      }
    });
  }

  handleSuccess() {
    const message: string = this.edit ? 'Actualizado' : 'Guardado';
    setTimeout(() => {
      this.onLoadToast('success', this.title, `${message} Correctamente`);
    }, 2000);
    this.loading = false;
    this.onConfirm.emit(true);
    this.modalRef.content.callback(true);
    this.close();
  }
}
