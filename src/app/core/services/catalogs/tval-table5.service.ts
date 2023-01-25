import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ENDPOINT_LINKS } from 'src/app/common/constants/endpoints';
import { ICrudMethods } from 'src/app/common/repository/interfaces/crud-methods';
import { ListParams } from 'src/app/common/repository/interfaces/list-params';
import { Repository } from 'src/app/common/repository/repository';
import { IListResponse } from '../../interfaces/list-response.interface';
import { ITvalTable5 } from '../../models/catalogs/tval-Table5.model';

@Injectable({
  providedIn: 'root',
})
export class TvalTable5Service implements ICrudMethods<ITvalTable5> {
  private readonly route: string = ENDPOINT_LINKS.DinamicTablesName;
  private readonly route1: string = ENDPOINT_LINKS.DinamicTables;
  constructor(private Tvaltablas1Repository: Repository<ITvalTable5>) {}

  getById4(
    id: string | number,
    params?: ListParams
  ): Observable<IListResponse<ITvalTable5>> {
    return this.Tvaltablas1Repository.getById4(`${this.route}`, id, params);
  }
  create2(id: string | number, model: ITvalTable5): Observable<ITvalTable5> {
    return this.Tvaltablas1Repository.create2(
      `${this.route1}/tval-table5/${id}`,
      model
    );
  }

  update2(
    id: string | number,
    type: string | number,
    model: ITvalTable5
  ): Observable<Object> {
    return this.Tvaltablas1Repository.update2(
      `${this.route1}/tval-table5/id/${id}/typeTable`,
      type,
      model
    );
  }
}
