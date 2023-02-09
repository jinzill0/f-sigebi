import { Component, EventEmitter, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { BehaviorSubject, takeUntil } from 'rxjs';
import { TABLE_SETTINGS } from 'src/app/common/constants/table-settings';
import { ListParams } from 'src/app/common/repository/interfaces/list-params';
import { GoodService } from 'src/app/core/services/ms-good/good.service';
import { RealStateService } from 'src/app/core/services/ms-good/real-state.service';
import { BasePage } from 'src/app/core/shared/base-page';
import { MENAJE_COLUMN } from './menaje-columns';

class Manege {
  id: number;
  description: string;
  requestId: string;
}

@Component({
  selector: 'app-menaje',
  templateUrl: './menaje.component.html',
  styles: [],
})
export class MenajeComponent extends BasePage implements OnInit {
  title: any = 'Inmuebles de la solicitud';
  paragraphs: any[] = [];
  params = new BehaviorSubject<ListParams>(new ListParams());
  totalItems: number = 0;
  public event: EventEmitter<any> = new EventEmitter();
  immovablesSelected: any;
  requestId: number = null;
  listMenage: any = [];
  menage = new Manege();

  data: any;

  constructor(
    private modelRef: BsModalRef,
    private goodService: GoodService,
    private goodRealState: RealStateService
  ) {
    super();
  }

  ngOnInit(): void {
    this.settings = {
      ...TABLE_SETTINGS,
      actions: false,
      columns: MENAJE_COLUMN,
    };
    this.loadPaginator();
  }

  loadPaginator() {
    var param = new ListParams();
    this.params.pipe(takeUntil(this.$unSubscribe)).subscribe(data => {
      param.page = data.inicio;
      param.limit = data.pageSize;
      param.text = data.text;
      this.getData(param);
    });
  }

  getData(params: ListParams) {
    this.loading = true;
    this.paragraphs = [];
    this.listMenage = [];
    params['filter.requestId'] = `$eq:${this.requestId}`;
    this.goodService.getAll(params).subscribe({
      next: async (resp: any) => {
        if (resp.data) {
          const result = resp.data.map(async (item: any) => {
            const menage = await this.getGoodRealState(item);
            if (menage !== null) {
              this.listMenage.push(menage);
            }
          });

          Promise.all(result).then(data => {
            this.paragraphs = this.listMenage;
            this.loading = false;
          });
        }
      },
    });
  }

  getGoodRealState(item: any): any {
    const params = new ListParams();
    return new Promise((resolve, reject) => {
      params['filter.id'] = `$eq:${item.id}`;
      this.goodRealState.getAll(params).subscribe({
        next: resp => {
          if (resp.data.length !== 0) {
            this.menage.id = item.id;
            this.menage.description = resp.data[0].description;
            this.menage.requestId = item.requestId;
            resolve(this.menage);
          } else {
            resolve(null);
          }
        },
      });
    });
  }

  selectRow(event: any) {
    console.log(event);

    this.immovablesSelected = event.data;
  }

  selectImmovable() {
    this.event.emit(this.immovablesSelected);
    this.close();
  }

  close() {
    this.modelRef.hide();
  }
}
