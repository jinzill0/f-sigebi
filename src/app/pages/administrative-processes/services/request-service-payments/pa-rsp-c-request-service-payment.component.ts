import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalService } from 'ngx-bootstrap/modal';
import { Router } from '@angular/router';
import { BehaviorSubject, takeUntil } from 'rxjs';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { BasePage } from 'src/app/core/shared/base-page';
import { ListParams } from 'src/app/common/repository/interfaces/list-params';
import { COLUMNS } from './columns';
//Components
import { PaGspCGoodsServicePaymentComponent } from '../goods-service-payments/pa-gsp-c-goods-service-payment.component';
import { PaRsfCRequestServiceFormComponent } from '../request-service-form/pa-rsf-c-request-service-form.component';

@Component({
  selector: 'app-pa-rsp-c-request-service-payment',
  templateUrl: './pa-rsp-c-request-service-payment.component.html',
  styles: [
  ]
})
export class PaRspCRequestServicePaymentComponent extends BasePage implements OnInit{

  form: FormGroup = new FormGroup({});

  data: any[] = [
      {
          request: 'Solictu1234',
          goodNumber: '2563',
          service: 'CVE_SERVICE+DI_DESCRIPTION',
          requestDate: '29-12-1999',
          paymentDate: 'FEC_PAGO',
          amount: '$10000000',
          isPayment: false,
      },
      {
          request: 'abc3422',
          goodNumber: '2563',
          service: 'CVE_SERVICE+DI_DESCRIPTION',
          requestDate: '29-12-2020',
          paymentDate: 'FEC_PAGO',
          amount: '$10000000',
          isPayment: true,
      }
  ];

  totalItems: number = 0;
  params = new BehaviorSubject<ListParams>(new ListParams());
  //Columns
  columns=COLUMNS;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private modalService: BsModalService
  ) {
    super();
    this.settings = {
      ...this.settings,
      actions: { add: true, delete: true},
      columns: COLUMNS,
    };
  }

  ngOnInit(): void {

    this.prepareForm();
    /**
     * Instance renderComponent
     **/
    /*this.columns.isPayment={
      ...this.columns.isPayment,
      onComponentInitFunction: (instance: any) => {
        instance.toggle.subscribe((data: any) => {
         this.otherFn(data);
        });
      }
    }*/
  }

  private prepareForm(): void {
    this.form = this.fb.group({
      applicationDate: [null, [Validators.required]],
      pb_type: ['pb_lista', [Validators.required]],
    });
  }

  settingsChange($event: any): void {
    this.settings = $event;
  }

  openGlobal(requestId: string) {
    //Change Routing
    this.router.navigate([
      'pages/administrative-processes/services/global',
      requestId,
    ]);
  }

  openModal(context?: Partial<PaGspCGoodsServicePaymentComponent>): void {
    const modalRef = this.modalService.show(
      PaGspCGoodsServicePaymentComponent,
      {
        //initialState: {/**/},
        class: 'modal-lg modal-dialog-centered',
        ignoreBackdropClick: true,
      }
    );

    modalRef.content.data.subscribe(data => {
      if (data) {
        /*...*/
      }
    });
  }

  openModalNew(context?: Partial<PaRsfCRequestServiceFormComponent>): void {
    const modalRef = this.modalService.show(
      PaRsfCRequestServiceFormComponent,
      {
        //initialState: {/**/},
        class: 'modal-lg modal-dialog-centered',
        ignoreBackdropClick: true,
      }
    );

    modalRef.content.data.subscribe(data => {
      if (data) {
        /*...*/
      }
    });
  }
}
