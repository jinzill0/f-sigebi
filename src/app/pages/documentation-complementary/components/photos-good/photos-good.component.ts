import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BasePage } from 'src/app/core/shared/base-page';
import { PHOTOGRAPHY_COLUMNS } from 'src/app/pages/request/shared-request/photography-form/photography-columns';

@Component({
  selector: 'app-photos-good',
  templateUrl: './photos-good.component.html',
  styleUrls: ['../../styles/search-document-form.scss'],
})
export class PhotosGoodComponent extends BasePage implements OnInit {
  @Input() photosGood: FormGroup;
  imagesData: any[] = [];
  showSearchForm: boolean = false;
  constructor() {
    super();
    this.settings = {
      ...this.settings,
      columns: PHOTOGRAPHY_COLUMNS,
      edit: { editButtonContent: '<i class="fa fa fa-file"></i>' },
      delete: {
        deleteButtonContent: '<i class="fa fa-eye text-info mx-2"></i>',
      },
    };

    this.imagesData = [
      {
        noPhotography: 435345345,
        managementNumber: 564564566,
        titleDocument: 'Documeto prueba',
        typeDocument: 'Prueba',
        author: 'Gustavo',
        creationDate: '12-11-1999',
      },
    ];
  }

  ngOnInit(): void {}

  viewImage() {}
}
