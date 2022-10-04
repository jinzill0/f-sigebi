import { Component } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { BasePage } from 'src/app/core/shared/base-page';

@Component({
  template: `
    <app-modal>
      <div header>
        <h5 class="modal-title">{{ title }}</h5>
      </div>
      <div body>
        <p>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nihil
          perspiciatis in impedit sunt officia aspernatur quam consequatur qui,
          aperiam, natus ratione! Maiores dolorum magnam et accusantium
          assumenda. Autem, enim optio.
        </p>
      </div>
      <div footer>
        <div class="d-flex justify-content-center">
          <div class="m-3">
            <button type="button" class="btn btn-primary active">
              Guardar
            </button>
          </div>
          <div class="m-3">
            <button
              type="button"
              class="btn btn-danger active"
              (click)="close()">
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </app-modal>
  `,
})
export class ExampleModalComponent extends BasePage {
  title: string = '';
  constructor(private bsModalRef: BsModalRef) {
    super();
  }
  close() {
    this.bsModalRef.content.callback({ editado: true });
    this.bsModalRef.hide();
  }
}
