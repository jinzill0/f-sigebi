import { Component, OnInit } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BehaviorSubject, takeUntil } from 'rxjs';
import { TABLE_SETTINGS } from 'src/app/common/constants/table-settings';
import { ListParams } from 'src/app/common/repository/interfaces/list-params';
import { IGoodSubType } from 'src/app/core/models/catalogs/good-subtype.model';
import { GoodSubtypeService } from 'src/app/core/services/catalogs/good-subtype.service';
import { BasePage } from 'src/app/core/shared/base-page';
import { GoodSubtypeFormComponent } from '../good-subtype-form/good-subtype-form.component';
import { GOOD_SUBTYPES_COLUMNS } from './good-subtype-columns';

@Component({
  selector: 'app-good-subtypes-list',
  templateUrl: './good-subtypes-list.component.html',
  styles: [
  ]
})
export class GoodSubtypesListComponent extends BasePage implements OnInit {
  settings = TABLE_SETTINGS;
  paragraphs: IGoodSubType[] = [];
  totalItems: number = 0;
  params = new BehaviorSubject<ListParams>(new ListParams());

  constructor(
    private goodTypesService: GoodSubtypeService,
    private modalService: BsModalService
  ) {
    super();
    this.settings.columns = GOOD_SUBTYPES_COLUMNS;
    this.settings.actions.delete = true;
  }

  ngOnInit(): void {
    this.params
      .pipe(takeUntil(this.$unSubscribe))
      .subscribe(() => this.getExample());
  }

  getExample() {
    this.loading = true;
    this.goodTypesService.getAll(this.params.getValue()).subscribe(
      response => {
        this.paragraphs = response.data;
        this.totalItems = response.count;
        this.loading = false;
      },
      error => (this.loading = false)
    );
  }

  openModal(context?: Partial<GoodSubtypeFormComponent>) {
    const modalRef = this.modalService.show(GoodSubtypeFormComponent, {
      initialState: context,
      class: 'modal-lg modal-dialog-centered',
      ignoreBackdropClick: true,
    });
    modalRef.content.refresh.subscribe(next => {
      if (next) this.getExample();
    });
  }

  add() {
    this.openModal();
  }

  edit(goodSubtype: IGoodSubType) {
    this.openModal({ edit: true, goodSubtype });
  }

  delete(goodSubtype: IGoodSubType) {
    this.alertQuestion(
      'warning',
      'Eliminar',
      'Desea eliminar este registro?'
    ).then(question => {
      if (question.isConfirmed) {
        //Ejecutar el servicio
      }
    });
  }
}
