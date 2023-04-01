import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LotParamsEndpoints } from 'src/app/common/constants/endpoints/ms-lot-params-endpoint';
import { ListParams } from 'src/app/common/repository/interfaces/list-params';
import { HttpService } from 'src/app/common/services/http.service';
@Injectable({
  providedIn: 'root',
})
export class LotParamsService extends HttpService {
  constructor() {
    super();
    this.microservice = LotParamsEndpoints.BasePath;
  }

  getLotParameterById(id: string | number, params?: ListParams) {
    const route = `${LotParamsEndpoints.FindAll}?filter.idLot=${id}`;
    return this.get(route, params);
  }

  createLotParameter(body: any): Observable<any> {
    return this.post<any>(LotParamsEndpoints.Create, body);
  }

  getAll(params: ListParams | string): Observable<any> {
    return this.get<any>(LotParamsEndpoints.FindAll, params);
  }

  update(id: number | string, body: Object): Observable<any> {
    return this.put<any>(`${LotParamsEndpoints.Update}/${id}`, body);
  }

  remove(id: number | string): Observable<any> {
    return this.delete(`${LotParamsEndpoints.Delete}/${id}`);
  }
}
