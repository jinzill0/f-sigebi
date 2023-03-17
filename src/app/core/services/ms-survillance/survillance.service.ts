import { Injectable } from '@angular/core';
import { SurvillanceEndpoints } from 'src/app/common/constants/endpoints/ms-survillance';
import { HttpService, _Params } from 'src/app/common/services/http.service';
import { IListResponse } from '../../interfaces/list-response.interface';
import { VigProcessPercentages } from '../../models/ms-survillance/survillance';

@Injectable({
  providedIn: 'root',
})
export class SurvillanceService extends HttpService {
  private readonly route = SurvillanceEndpoints;
  constructor() {
    super();
    this.microservice = this.route.Survillance;
  }

  getVigProcessPercentages(params?: _Params) {
    return this.get<IListResponse<VigProcessPercentages>>(
      this.route.VigProcessPercentages,
      params
    );
  }

  postVigProcessPercentages(data: VigProcessPercentages) {
    return this.post(this.route.VigProcessPercentages, data);
  }

  putVigProcessPercentages(id: number, data: VigProcessPercentages) {
    return this.put(`${this.route.VigProcessPercentages}/${id}`, data);
  }

  deleteVigProcessPercentages(id: number) {
    return this.delete(`${this.route.VigProcessPercentages}/${id}`);
  }
}
