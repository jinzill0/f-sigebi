import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-expedients-tabs',
  templateUrl: './expedients-tabs.component.html',
  styles: [],
})
export class ExpedientsTabsComponent implements OnInit {
  public typeDoc: string = '';

  constructor() {}

  ngOnInit(): void {
    this.requestSelected(1);
  }

  requestSelected(type: number) {
    this.typeDocumentMethod(type);
  }

  requestExpedient(type: number) {
    this.typeDocumentMethod(type);
  }

  typeDocumentMethod(type: number) {
    switch (type) {
      case 1:
        this.typeDoc = 'doc-request';
        break;
      case 2:
        this.typeDoc = 'doc-expedient';
        break;
      case 3:
        this.typeDoc = 'request-expedient';
        break;
      default:
        break;
    }
  }
}
