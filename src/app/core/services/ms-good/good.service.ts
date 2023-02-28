import { EventEmitter, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListParams } from 'src/app/common/repository/interfaces/list-params';
import { HttpService } from 'src/app/common/services/http.service';
import { GoodEndpoints } from '../../../common/constants/endpoints/ms-good-endpoints';
import { IListResponse } from '../../interfaces/list-response.interface';
import { ITrackedGood } from '../../models/ms-good-tracker/tracked-good.model';
import { IGood } from '../../models/ms-good/good';
import { IGoodDesc } from '../../models/ms-good/good-and-desc.model';

@Injectable({
  providedIn: 'root',
})
export class GoodService extends HttpService {
  good$ = new EventEmitter<IGood>();
  constructor() {
    super();
    this.microservice = GoodEndpoints.Good;
  }

  getAll(params?: ListParams | string): Observable<IListResponse<IGood>> {
    return this.get<IListResponse<IGood>>(GoodEndpoints.Good, params);
  }

  getAllFilter(params?: string): Observable<IListResponse<IGood>> {
    return this.get<IListResponse<IGood>>(`${GoodEndpoints.Good}?${params}`);
  }

  getById(id: string | number) {
    const route = `${GoodEndpoints.Good}/${id}`;
    return this.get<IGood>(route);
  }

  create(good: IGood) {
    return this.post(GoodEndpoints.Good, good);
  }

  update(good: IGood) {
    const route = `${GoodEndpoints.Good}`;
    return this.put(route, good);
  }

  remove(id: string | number) {
    const route = `${GoodEndpoints.Good}/${id}`;
    return this.delete(route);
  }

  getByExpedient(
    expedient: number | string,
    params?: ListParams
  ): Observable<IListResponse<IGood>> {
    if (params) {
      params['expedient'] = expedient;
    }
    const route = GoodEndpoints.SearchByExpedient;
    return this.get<IListResponse<IGood>>(route, params);
  }

  getGoodAndDesc(goodId: number | string) {
    const route = `${GoodEndpoints.GoodAndDesc}/${goodId}`;
    return this.get<IGoodDesc>(route);
  }

  getByWarehouse(
    body: Object,
    params?: ListParams
  ): Observable<IListResponse<IGood>> {
    const route = `${GoodEndpoints.Good}/getGoodByWarehouse`;
    console.log(route);

    return this.post<IListResponse<IGood>>(route, body);
  }
  getByExpedientAndStatus(
    expedient: string | number,
    status: string,
    params?: ListParams
  ): Observable<IListResponse<IGood>> {
    const route = `${GoodEndpoints.Good}?filter.fileNumber=$eq:${expedient}&filter.status=$eq:${status}`;
    return this.get<IListResponse<IGood>>(route, params);
  }
  getStatusByGood(idGood: string | number): Observable<any> {
    const route = `${GoodEndpoints.StatusAndDesc}/${idGood}`;
    return this.get<any>(route);
  }
  getBySafe(
    body: Object,
    params?: ListParams
  ): Observable<IListResponse<IGood>> {
    const route = `${GoodEndpoints.Good}/getGoodBySafe`;
    console.log(route);
    return this.post<IListResponse<IGood>>(route, body);
  }

  getGoodByStatusPDS(
    params?: ListParams | string
  ): Observable<IListResponse<IGood>> {
    const route = `${GoodEndpoints.Good}?filter.status=PDS`;
    return this.get<IListResponse<IGood>>(route, params);
  }
  updateTracked(id: string | number, good: ITrackedGood) {
    const route = `${GoodEndpoints.Good}/${id}`;
    return this.put(route, good);
  }

  getExemptedGoods(
    params?: ListParams | string
  ): Observable<IListResponse<IGood>> {
    const route = `${GoodEndpoints.Good}?filter.extDomProcess=TRANSFERENTE`;
    const route2 = `${GoodEndpoints.Good}?filter.goodId=2203409`;
    return this.get<IListResponse<IGood>>(route2, params);
  }


}
