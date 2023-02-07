import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IListResponse } from 'src/app/core/interfaces/list-response.interface';
import { environment } from 'src/environments/environment';
import { ListParams } from '../interfaces/list-params';
import { IParametergoodMethods } from '../interfaces/parametergood-methods';
@Injectable({ providedIn: 'root' })
export class ParametergoodRepository<T> implements IParametergoodMethods<T> {
  ms: string = `${environment.API_URL}parametergood/api/v1`;

  constructor(public readonly httpClient: HttpClient) {}

  getAll(route: string, _params?: ListParams): Observable<IListResponse<T>> {
    const fullRoute = `${this.ms}/${route}`;
    const params = this.makeParams(_params);

    return this.httpClient.get<IListResponse<T>>(`${fullRoute}`, { params });
  }

  create(route: string, formData: Object) {
    const fullRoute = this.buildRoute(route);
    console.log(fullRoute);

    return this.httpClient.post<T>(`${fullRoute}`, formData);
  }

  getByLogicalTables?(
    route: string,
    id: number | string,
    _params?: ListParams
  ): Observable<IListResponse<T>> {
    const fullRoute = `${this.ms}/${route}`;
    const params = this.makeParams(_params);
    return this.httpClient.get<IListResponse<T>>(`${fullRoute}/${id}`);
  }

  update(route: string, id: number | string, formData: Object) {
    const fullRoute = `${this.ms}/${route}`;
    return this.httpClient.put(`${fullRoute}/${id}`, formData);
  }

  getById(route: string, _id?: number | string): Observable<T> {
    const fullRoute = `${this.ms}/${route}`;
    return this.httpClient.get<T>(`${fullRoute}/${_id}`);
  }

  private makeParams(params: ListParams): HttpParams {
    let httpParams: HttpParams = new HttpParams();
    Object.keys(params).forEach(key => {
      httpParams = httpParams.append(key, (params as any)[key]);
    });
    return httpParams;
  }

  private buildRoute(route: string) {
    const paths = route.split('/');
    paths.shift();
    if (paths.length === 0) {
      return `${environment.API_URL}catalog/api/v1/${route}`;
    }
    const ms = route.split('/')[0];
    return `${environment.API_URL}${ms}/api/v1/${paths.join('/')}`;
  }
}
