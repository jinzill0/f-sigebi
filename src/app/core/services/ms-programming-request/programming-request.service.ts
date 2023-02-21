import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListParams } from 'src/app/common/repository/interfaces/list-params';
import { environment } from 'src/environments/environment';
import { IListResponse } from '../../interfaces/list-response.interface';
import { IUser } from '../../models/catalogs/user.model';
import { Iprogramming } from '../../models/good-programming/programming';
import { ICatThirdView } from '../../models/ms-goods-inv/goods-inv.model';

@Injectable({ providedIn: 'root' })
export class ProgrammingRequestService {
  constructor(private http: HttpClient) {}

  getUserInfo() {
    return this.http.get(`${environment.api_external_userInfo}`);
  }

  getProgrammingId(id: number) {
    return this.http.get<Iprogramming>(
      `${environment.API_URL}programminggood/api/v1/programming/${id}`
    );
  }

  getUsersProgramming(
    _params: ListParams,
    ids: Object
  ): Observable<IListResponse<IUser>> {
    const params = this.makeParams(_params);
    const route = `programminggood/api/v1/programming-users/find-by-ids`;
    return this.http.post<IListResponse<IUser>>(
      `${environment.API_URL}/${route}?${params}`,
      ids
    );
  }

  postCatThirdView(
    _params: ListParams,
    language: Object
  ): Observable<IListResponse<ICatThirdView>> {
    const params = this.makeParams(_params);
    const route = `goodsinv/api/v1/views/cat-third-view`;
    return this.http.post<IListResponse<ICatThirdView>>(
      `${environment.API_URL}${route}?${params}`,
      language
    );
  }

  updateProgramming(id: number, formData: Object) {
    const route = `programminggood/api/v1/programming/${id}`;
    return this.http.put(`${environment.API_URL}/${route}`, formData);
  }

  private makeParams(params: ListParams): HttpParams {
    let httpParams: HttpParams = new HttpParams();
    Object.keys(params).forEach(key => {
      httpParams = httpParams.append(key, (params as any)[key]);
    });
    return httpParams;
  }
}
