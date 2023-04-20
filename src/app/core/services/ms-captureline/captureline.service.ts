import { Injectable } from '@angular/core';
import { CapturelineEndpoints } from 'src/app/common/constants/endpoints/ms-captureline';
import { HttpService, _Params } from 'src/app/common/services/http.service';
import { IListResponse } from '../../interfaces/list-response.interface';
import { ITmpLcComer } from '../../models/ms-captureline/captureline';

@Injectable({
  providedIn: 'root',
})
export class CapturelineService extends HttpService {
  private readonly route = CapturelineEndpoints;
  constructor() {
    super();
    this.microservice = this.route.Captureline;
  }

  getTmpLcComer(params?: _Params) {
    return this.get<IListResponse<ITmpLcComer>>(this.route.TmpLcComer, params);
  }

  postTmpLcComer(data: ITmpLcComer) {
    return this.post<ITmpLcComer>(this.route.TmpLcComer, data);
  }

  postLoadCheckPortal(body: {
    event: string;
    p_FLAG: boolean;
    validation: string;
    // createdBy: string;
    // records: string;
    // amount: string;
  }) {
    return this.post(this.route.LoadCheckPortal, body);
  }
}
