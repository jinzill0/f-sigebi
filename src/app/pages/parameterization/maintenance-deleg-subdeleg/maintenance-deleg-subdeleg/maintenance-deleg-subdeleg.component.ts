import { Component, OnInit, Renderer2 } from '@angular/core';
import { BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { BehaviorSubject, takeUntil } from 'rxjs';
import { ListParams } from 'src/app/common/repository/interfaces/list-params';
import { BasePage } from 'src/app/core/shared/base-page';
import { MaintenanceDelegSubdelegModalComponent } from '../maintenance-deleg-subdeleg-modal/maintenance-deleg-subdeleg-modal.component';
import {
  DELEGATION_COLUMNS,
  SUBDELEGATION_COLUMNS,
} from './maintenance-deleg-sub-columns';
//models
import { IDelegation } from 'src/app/core/models/catalogs/delegation.model';
import { ISubdelegation } from 'src/app/core/models/catalogs/subdelegation.model';
//services
import { DelegationService } from 'src/app/core/services/maintenance-delegations/delegation.service';
import { SubDelegationService } from 'src/app/core/services/maintenance-delegations/subdelegation.service';

@Component({
  selector: 'app-maintenance-deleg-subdeleg',
  templateUrl: './maintenance-deleg-subdeleg.component.html',
  styles: [],
})
export class MaintenanceDelegSubdelegComponent
  extends BasePage
  implements OnInit
{
  totalItems: number = 0;
  totalItems2: number = 0;

  params = new BehaviorSubject<ListParams>(new ListParams());
  params2 = new BehaviorSubject<ListParams>(new ListParams());

  delegationList: IDelegation[] = [];
  subDelegationList: ISubdelegation[] = [];
  delegations: IDelegation;
  dataId: any;

  settings2;

  constructor(
    private modalService: BsModalService,
    private delegationService: DelegationService,
    private subDelegationService: SubDelegationService,
    private r2: Renderer2
  ) {
    super();
    this.settings = {
      ...this.settings,
      hideSubHeader: false,
      actions: false,
      columns: { ...DELEGATION_COLUMNS },
    };

    this.settings2 = {
      ...this.settings,
      hideSubHeader: false,
      actions: {
        columnTitle: 'Acciones',
        edit: true,
        delete: false,
        add: false,
        position: 'right',
      },
      columns: { ...SUBDELEGATION_COLUMNS },
    };
  }

  ngOnInit(): void {
    this.params
      .pipe(takeUntil(this.$unSubscribe))
      .subscribe(() => this.getDelegationAll());
  }

  getDelegationAll() {
    this.loading = true;

    this.delegationService.getAll(this.params.getValue()).subscribe({
      next: response => {
        this.delegationList = response.data;
        this.totalItems = response.count;
        this.loading = false;
      },
      error: error => {
        this.loading = false;
        console.log(error);
      },
    });
  }

  rowsSelected(event: any) {
    this.totalItems2 = 0;
    this.subDelegationList = [];
    this.delegations = event.data;
    this.params2.pipe(takeUntil(this.$unSubscribe)).subscribe(() => {
      this.getSubDelegations(this.delegations);
      const btn = document.getElementById('new-sd');
      this.r2.removeClass(btn, 'disabled');
      this.dataId = this.delegations;
    });
  }

  getSubDelegations(delegation: IDelegation) {
    this.loading = true;
    this.subDelegationService
      .getById(delegation.id, this.params2.getValue())
      .subscribe({
        next: response => {
          this.subDelegationList = response.data;
          this.totalItems2 = response.count;
          this.loading = false;
        },
        error: error => (this.loading = false),
      });
  }

  openForm(subDelegation?: ISubdelegation) {
    console.log(subDelegation);
    const idD = { ...this.delegations };
    let delegation = this.delegations;
    let config: ModalOptions = {
      initialState: {
        subDelegation,
        delegation,
        idD,
        callback: (next: boolean) => {
          if (next) this.getSubDelegations(this.dataId);
        },
      },
      class: 'modal-lg modal-dialog-centered',
      ignoreBackdropClick: true,
    };
    this.modalService.show(MaintenanceDelegSubdelegModalComponent, config);
  }
}
