import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { LocalDataSource } from 'ng2-smart-table';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { BehaviorSubject } from 'rxjs';
import { PreviewDocumentsComponent } from 'src/app/@standalone/preview-documents/preview-documents.component';
import { WContentService } from 'src/app/core/services/ms-wcontent/wcontent.service';
import { TABLE_SETTINGS } from '../../../../../../../common/constants/table-settings';
import { ListParams } from '../../../../../../../common/repository/interfaces/list-params';
import { BasePage } from '../../../../../../../core/shared/base-page';
import { PHOTOS_TABLE_COLUMNS } from '../columns/photos-table-columns';

@Component({
  selector: 'app-open-photos',
  templateUrl: './open-photos.component.html',
  styleUrls: ['./open-photos.component.scss'],
})
export class OpenPhotosComponent extends BasePage implements OnInit {
  paragraphs: LocalDataSource = new LocalDataSource();
  information: any;
  columns = PHOTOS_TABLE_COLUMNS;
  params = new BehaviorSubject<ListParams>(new ListParams());
  totalItems: number = 0;

  constructor(
    private bsModalRef: BsModalRef,
    private wContentService: WContentService,
    private modalservice: BsModalService,
    private sanitizer: DomSanitizer
  ) {
    super();
  }

  ngOnInit(): void {
    this.settings = {
      ...TABLE_SETTINGS,
      actions: false,
      selectMode: '',
      columns: PHOTOS_TABLE_COLUMNS,
    };
    this.columns.actions = {
      ...this.columns.actions,
      onComponentInitFunction: (instance?: any) => {
        instance.btnclick.subscribe((data: any) => {
          this.getImage(data.dDocName);
        });
      },
    };

    this.getImagesGood();
  }

  getImagesGood() {
    const idReq: Object = {
      xidSolicitud: this.information.requestId,
      xidBien: this.information.id,
    };

    this.wContentService.getDocumentos(idReq).subscribe(data => {
      const _data = data.data.filter((img: any) => {
        if (img.dDocType == 'DigitalMedia') return img;
      });
      this.paragraphs.load(_data);
      this.totalItems = this.paragraphs.count();
    });
  }

  getImage(docName: string) {
    this.wContentService.getObtainFile(docName).subscribe(data => {
      let blob = this.dataURItoBlob(data);
      let file = new Blob([blob], { type: 'image/jpg' });
      const fileURL = URL.createObjectURL(file);
      this.openPrevImg(fileURL);
    });
  }

  dataURItoBlob(dataURI: any) {
    const byteString = window.atob(dataURI);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const int8Array = new Uint8Array(arrayBuffer);
    for (let i = 0; i < byteString.length; i++) {
      int8Array[i] = byteString.charCodeAt(i);
    }
    const blob = new Blob([int8Array], { type: 'image/jpg' });
    return blob;
  }

  openPrevImg(imageUrl: string) {
    let config: ModalOptions = {
      initialState: {
        documento: {
          urlDoc: this.sanitizer.bypassSecurityTrustResourceUrl(imageUrl),
          type: 'img',
        },
        callback: (data: any) => {},
      }, //pasar datos por aca
      class: 'modal-lg modal-dialog-centered', //asignar clase de bootstrap o personalizado
      ignoreBackdropClick: true, //ignora el click fuera del modal
    };
    this.modalservice.show(PreviewDocumentsComponent, config);
  }

  close(): void {
    this.bsModalRef.hide();
  }
}
