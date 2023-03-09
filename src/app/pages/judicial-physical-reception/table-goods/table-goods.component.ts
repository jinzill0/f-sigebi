import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BehaviorSubject, takeUntil } from 'rxjs';
import { ListParams } from 'src/app/common/repository/interfaces/list-params';
import { BasePage } from 'src/app/core/shared/base-page';
import { SharedModule } from 'src/app/shared/shared.module';

@Component({
  selector: 'app-table-goods',
  standalone: true,
  imports: [CommonModule, SharedModule],
  templateUrl: './table-goods.component.html',
  styles: [
    `
      ng2-smart-table {
        padding: 0px;
      }
      .table-container {
        margin-right: 14px;
        .table-responsive {
          padding: 0px;
          margin-left: 15px;
        }
        @media screen and (max-width: 767px) {
          .table-responsive {
            padding: 0px;
          }
        }
      }
    `,
  ],
})
export class TableGoodsComponent extends BasePage implements OnInit {
  @Input()
  get statusActaValue() {
    return this._statusActaValue;
  }
  set statusActaValue(value: string) {
    this._statusActaValue = value;
    this.updateSettingsGoods();
  }
  @Input() data: any[] = [];
  @Input() totalItems: number = 0;
  @Input() settingsTable: any;
  @Output() updateData = new EventEmitter<ListParams>();
  @Output() rowsSelected = new EventEmitter();
  @Output() updateGoodsRow = new EventEmitter();
  @Output() showDeleteAlert = new EventEmitter();
  private _statusActaValue: string;
  params = new BehaviorSubject<ListParams>(new ListParams());
  constructor() {
    super();
  }

  ngOnInit(): void {
    this.params.pipe(takeUntil(this.$unSubscribe)).subscribe(params => {
      // console.log(x);
      this.updateData.emit(params);
    });
  }

  private updateSettingsGoods(value = this.statusActaValue) {
    this.settingsTable = {
      ...this.settingsTable,
      actions: {
        ...this.settingsTable.actions,
        edit: value !== 'CERRADA',
        delete: value !== 'CERRADA',
      },
    };
    this.data = [...this.data];
  }
}
