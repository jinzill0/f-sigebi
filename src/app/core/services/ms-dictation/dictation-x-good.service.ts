import { Injectable } from '@angular/core';
import { DictationEndpoints } from 'src/app/common/constants/endpoints/ms-dictation-endpoint';
import { HttpService, _Params } from 'src/app/common/services/http.service';
import { IListResponse } from '../../interfaces/list-response.interface';
import { IDictationXGoodByFileNumber } from '../../models/ms-dictation/dictation-x-good.model';

@Injectable({
  providedIn: 'root',
})
export class DictationXGoodService extends HttpService {
  private readonly route = DictationEndpoints;
  constructor() {
    super();
    this.microservice = DictationEndpoints.BasePath;
  }

  getDictationXGoodByFileNummber(fileNumber: number) {
    return this.get<IListResponse<IDictationXGoodByFileNumber>>(
      this.route.DictationXGood + '/getByFileNumber/' + fileNumber
    );
  }

  getByAct(goodNumbers: string | number[], params?: _Params) {
    return this.post<IListResponse<{ cve_acta: string }>>(
      this.route.DictationXGood + '/getByAct',
      {
        array: goodNumbers,
      }
    );
  }

  getByDictation(goodNumbers: string | number[], params?: _Params) {
    return this.post<IListResponse<{ clave_oficio_armada: string }>>(
      this.route.DictationXGood + '/getByDictation',
      {
        array: goodNumbers,
      }
    );
  }
}
