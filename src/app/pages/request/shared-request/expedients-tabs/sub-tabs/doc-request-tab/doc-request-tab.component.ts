import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { LocalDataSource } from 'ng2-smart-table';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { BehaviorSubject, takeUntil } from 'rxjs';
import { PreviewDocumentsComponent } from 'src/app/@standalone/preview-documents/preview-documents.component';
import { MODAL_CONFIG } from 'src/app/common/constants/modal-config';
import { TABLE_SETTINGS } from 'src/app/common/constants/table-settings';
import { ListParams } from 'src/app/common/repository/interfaces/list-params';
import { ModelForm } from 'src/app/core/interfaces/model-form';
import { IDelegation } from 'src/app/core/models/catalogs/delegation.model';
import { RegionalDelegationService } from 'src/app/core/services/catalogs/regional-delegation.service';
import { WContentService } from 'src/app/core/services/ms-wcontent/wcontent.service';
import { BasePage } from 'src/app/core/shared/base-page';
import { STRING_PATTERN } from 'src/app/core/shared/patterns';
import { DefaultSelect } from 'src/app/shared/components/select/default-select';
import { NewDocumentComponent } from '../new-document/new-document.component';
import { DOC_REQUEST_TAB_COLUMNS } from './doc-request-tab-columns';
import { SeeInformationComponent } from './see-information/see-information.component';

interface searchTable {
  noDoc: string;
  noReq: string;
  docTit: string;
  docType: string;
  author: string;
  dateCrea: string;
}

@Component({
  selector: 'app-doc-request-tab',
  templateUrl: './doc-request-tab.component.html',
  styleUrls: ['./doc-request-tab.component.scss'],
})
export class DocRequestTabComponent
  extends BasePage
  implements OnInit, OnChanges
{
  @ViewChild('myTemplate', { static: true }) template: TemplateRef<any>;
  @ViewChild('myTemplate', { static: true, read: ViewContainerRef })
  container: ViewContainerRef;
  @Input() typeDoc = '';
  @Input() displayName: string = '';
  title: string = '';
  showSearchForm: boolean = false;
  selectDocType = new DefaultSelect<any>();
  docRequestForm: ModelForm<any>;
  params = new BehaviorSubject<ListParams>(new ListParams());
  paramsTypeDoc = new BehaviorSubject<ListParams>(new ListParams());
  paramsRegDel = new BehaviorSubject<ListParams>(new ListParams());
  paragraphs: LocalDataSource = new LocalDataSource();
  columns = DOC_REQUEST_TAB_COLUMNS;
  parameter: any;
  type: string = '';
  selectRegDelegation = new DefaultSelect<IDelegation>();
  selectState = new DefaultSelect<any>();
  selectTransfe = new DefaultSelect<any>();
  idRequest: number = 0;
  totalItems: number = 0;
  constructor(
    public fb: FormBuilder,
    public modalService: BsModalService,
    private modalRef: BsModalRef,
    private activatedRoute: ActivatedRoute,
    private wContentService: WContentService,
    private sanitizer: DomSanitizer,
    private regDelService: RegionalDelegationService
  ) {
    super();
    this.idRequest = this.activatedRoute.snapshot.paramMap.get(
      'id'
    ) as unknown as number;
  }

  ngOnInit(): void {
    this.prepareForm();
    this.setTypeColumn();
    this.getRegDelegation(new ListParams());
    this.getDocType(new ListParams());
    this.typeDoc = this.type ? this.type : this.typeDoc;
    if (this.typeDoc === 'doc-request') {
      this.container.createEmbeddedView(this.template);
    }
    this.settings = { ...TABLE_SETTINGS, actions: false };
    this.settings.columns = DOC_REQUEST_TAB_COLUMNS;

    this.columns.button = {
      ...this.columns.button,
      onComponentInitFunction: (instance?: any) => {
        instance.btnclick1.subscribe((data: any) => {
          this.openDetail(data);
        }),
          instance.btnclick2.subscribe((data: any) => {
            this.openDoc(data.dDocName);
          });
      },
    };
  }

  ngOnChanges(changes: SimpleChanges): void {
    let onChangeCurrentValue = changes['typeDoc'].currentValue;
    this.typeDoc = onChangeCurrentValue;
    this.setTitle(onChangeCurrentValue);
  }

  prepareForm(): void {
    this.docRequestForm = this.fb.group({
      id: [null],
      text: [
        null,
        [Validators.pattern(STRING_PATTERN), Validators.maxLength(30)],
      ],
      docType: [null],
      docTitle: [null, []],
      typeTrasf: [
        null,
        [Validators.pattern(STRING_PATTERN), Validators.maxLength(30)],
      ],
      contributor: [
        null,
        [Validators.pattern(STRING_PATTERN), Validators.maxLength(30)],
      ],
      author: [
        null,
        [Validators.pattern(STRING_PATTERN), Validators.maxLength(30)],
      ],
      sender: [
        null,
        [Validators.pattern(STRING_PATTERN), Validators.maxLength(30)],
      ],
      noOfice: [
        null,
        [Validators.pattern(STRING_PATTERN), Validators.maxLength(30)],
      ],
      senderCharge: [
        null,
        [Validators.pattern(STRING_PATTERN), Validators.maxLength(30)],
      ],
      comment: [
        null,
        [Validators.pattern(STRING_PATTERN), Validators.maxLength(100)],
      ],
      noRequest: [null],
      responsible: [
        null,
        [Validators.pattern(STRING_PATTERN), Validators.maxLength(30)],
      ],
      regDelega: [null],
      state: [null],
      tranfe: [null],
    });

    this.docRequestForm.get('noRequest').setValue(this.idRequest);
  }

  getData() {
    this.loading = true;
    this.docRequestForm.get('noRequest').setValue(this.idRequest);
    const idSolicitud: Object = {
      xidSolicitud: this.idRequest,
    };
    this.wContentService.getDocumentos(idSolicitud).subscribe({
      next: data => {
        const filterDoc = data.data.filter((items: any) => {
          if (items.dDocType == 'Document') {
            return items;
          }
        });
        const info = filterDoc.map(async (items: any) => {
          const filter: any = await this.filterGoodDoc([items.xtipoDocumento]);
          items.xtipoDocumento = filter[0]?.ddescription;
          return items;
        });

        Promise.all(info).then(x => {
          console.log('data', x);
          this.paragraphs.load(x);
          this.totalItems = this.paragraphs.count();
          this.loading = false;
        });
      },
      error: error => {},
    });
  }

  updateData() {
    this.loading = true;
    const idSolicitud: Object = {
      xidSolicitud: this.idRequest,
    };
    this.wContentService.getDocumentos(idSolicitud).subscribe({
      next: data => {
        const filterDoc = data.data.filter((items: any) => {
          if (items.dDocType == 'Document') {
            return items;
          }
        });
        const info = filterDoc.map(async (items: any) => {
          const filter: any = await this.filterGoodDoc([items.xtipoDocumento]);
          items.xtipoDocumento = filter[0].ddescription;
          return items;
        });

        Promise.all(info).then(x => {
          console.log('actualizado', x);
          this.paragraphs.load(x);
          this.totalItems = this.paragraphs.count();
          this.loading = false;
        });
      },
      error: error => {},
    });
  }

  filterGoodDoc(typeDocument: any[]) {
    return new Promise((resolve, reject) => {
      const types = typeDocument.map((id: any) => {
        const data = {
          id: id,
        };

        return data;
      });

      this.wContentService
        .getDocumentTypes(this.paramsTypeDoc.getValue())
        .subscribe(data => {
          const filter = data.data.filter(type => {
            const index = types.findIndex(
              (_type: any) => _type.id == type.ddocType
            );
            return index < 0 ? false : true;
          });

          resolve(filter);
        });
    });
  }

  getDocType(params: ListParams) {
    this.wContentService.getDocumentTypes(params).subscribe(data => {
      this.selectDocType = new DefaultSelect(data.data, data.count);
    });
  }

  search(): void {
    const typeDocument = this.docRequestForm.get('docType').value;
    const titleDocument = this.docRequestForm.get('docTitle').value;
    const contribuyente = this.docRequestForm.get('contributor').value;
    const author = this.docRequestForm.get('author').value;
    const remitente = this.docRequestForm.get('sender').value;
    const senderCharge = this.docRequestForm.get('senderCharge').value;
    const noRequest = this.docRequestForm.get('noRequest').value;
    if (
      noRequest &&
      !typeDocument &&
      !titleDocument &&
      !contribuyente &&
      !author &&
      !remitente &&
      !senderCharge
    ) {
      this.params
        .pipe(takeUntil(this.$unSubscribe))
        .subscribe(() => this.getData());
    }
    if (typeDocument) {
      this.paragraphs.getElements().then(data => {
        const filter = data.filter((items: any) => {
          if (items.xtipoDocumento == typeDocument) return items;
        });

        if (filter.length > 0) {
          this.onLoadToast(
            'success',
            'Documentos encontrados correctamente',
            ''
          );
          this.paragraphs.load(filter);
        } else {
          this.onLoadToast('warning', 'Documentos no encontrados', '');
        }
      });
    }
    if (contribuyente) {
      this.paragraphs.getElements().then(data => {
        const filter = data.filter((items: any) => {
          if (items.xcontribuyente == contribuyente) return items;
        });

        if (filter.length > 0) {
          this.onLoadToast(
            'success',
            'Documentos encontrados correctamente',
            ''
          );
          this.paragraphs.load(filter);
        } else {
          this.onLoadToast('warning', 'Documentos no encontrados', '');
        }
      });
    }

    if (titleDocument) {
      this.paragraphs.getElements().then(data => {
        const filter = data.filter((items: any) => {
          if (items.ddocTitle == titleDocument) return items;
        });

        if (filter.length > 0) {
          this.onLoadToast(
            'success',
            'Documentos encontrados correctamente',
            ''
          );
          this.paragraphs.load(filter);
        } else {
          this.onLoadToast('warning', 'Documentos no encontrados', '');
        }
      });
    }

    if (author) {
      this.paragraphs.getElements().then(data => {
        const filter = data.filter((items: any) => {
          if (items.dDocAuthor == author) return items;
        });

        if (filter.length > 0) {
          this.onLoadToast(
            'success',
            'Documentos encontrados correctamente',
            ''
          );
          this.paragraphs.load(filter);
        } else {
          this.onLoadToast('warning', 'Documentos no encontrados', '');
        }
      });
    }

    if (remitente) {
      this.paragraphs.getElements().then(data => {
        const filter = data.filter((items: any) => {
          if (items.xremitente == remitente) return items;
        });

        if (filter.length > 0) {
          this.onLoadToast(
            'success',
            'Documentos encontrados correctamente',
            ''
          );
          this.paragraphs.load(filter);
        } else {
          this.onLoadToast('warning', 'Documentos no encontrados', '');
        }
      });
    }

    if (senderCharge) {
      this.paragraphs.getElements().then(data => {
        const filter = data.filter((items: any) => {
          if (items.xcargoRemitente == senderCharge) return items;
        });

        if (filter.length > 0) {
          this.onLoadToast(
            'success',
            'Documentos encontrados correctamente',
            ''
          );
          this.paragraphs.load(filter);
        } else {
          this.onLoadToast('warning', 'Documentos no encontrados', '');
        }
      });
    }
  }

  cleanForm(): void {
    this.docRequestForm.reset();
    this.getData();
  }

  openDetail(data: any): void {
    this.openModalInformation(data, 'detail');
  }

  openDoc(docName: string): void {
    this.wContentService.obtainFile(docName).subscribe(data => {
      let blob = this.dataURItoBlob(data);
      let file = new Blob([blob], { type: 'application/pdf' });
      const fileURL = URL.createObjectURL(file);
      this.openPrevPdf(fileURL);
    });
  }

  dataURItoBlob(dataURI: any) {
    const byteString = window.atob(dataURI);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const int8Array = new Uint8Array(arrayBuffer);
    for (let i = 0; i < byteString.length; i++) {
      int8Array[i] = byteString.charCodeAt(i);
    }
    const blob = new Blob([int8Array], { type: 'image/png' });
    return blob;
  }

  openPrevPdf(pdfUrl: string) {
    let config: ModalOptions = {
      initialState: {
        documento: {
          urlDoc: this.sanitizer.bypassSecurityTrustResourceUrl(pdfUrl),
          type: 'pdf',
        },
        callback: (data: any) => {},
      }, //pasar datos por aca
      class: 'modal-lg modal-dialog-centered', //asignar clase de bootstrap o personalizado
      ignoreBackdropClick: true, //ignora el click fuera del modal
    };
    this.modalService.show(PreviewDocumentsComponent, config);
  }

  close() {
    this.modalRef.hide();
  }

  openNewDocument() {
    let config = { ...MODAL_CONFIG, class: 'modal-lg modal-dialog-centered' };
    const idRequest = this.idRequest;
    let typeDoc = 'doc-request';
    config.initialState = {
      idRequest,
      typeDoc,
      callback: (data: boolean) => {
        if (data) {
          this.onLoadToast('success', 'Documento Guardado correctamente', '');
          //this.getData();
        }
      },
    };

    this.modalService.show(NewDocumentComponent, config);
  }

  private openModalInformation(data: any, typeInfo: string) {
    let config: ModalOptions = {
      initialState: {
        data,
        typeInfo,
        callback: (next: boolean) => {
          if (next) this.getData();
        },
      },
      class: 'modal-lg modal-dialog-centered',
      ignoreBackdropClick: true,
    };
    this.modalService.show(SeeInformationComponent, config);
  }

  getRegDelegation(event: any) {
    this.regDelService.getAll(this.paramsRegDel.getValue()).subscribe({
      next: data => {
        this.selectRegDelegation = new DefaultSelect(data.data, data.count);
      },
      error: error => {},
    });
  }

  getState(event: any) {}

  getTransfe(event: any) {}

  setTypeColumn() {
    /*if (this.displayName === 'validateEyeVisitResult') {
      this.columns.noReq.title = 'No. Expediente';
    } else {
      if (this.typeDoc === 'request-assets') {
        this.columns.noReq.title = 'No. Bien';
      } else {
        this.columns.noReq.title = 'No. Solicitud';
      }
    } */
  }

  setTitle(value: string) {
    switch (value) {
      case 'doc-request':
        this.title = 'Solicitudes';
        break;
      case 'doc-expedient':
        this.title = 'Expedientes';
        break;
      case 'request-expedient':
        this.title = '';
        break;
      default:
        break;
    }
  }
}
