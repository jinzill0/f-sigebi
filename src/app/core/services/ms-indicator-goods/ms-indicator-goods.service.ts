import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { EIndicatorGoodsEndpoints } from 'src/app/common/constants/endpoints/ms-indicatorgoods-endpoint';
import { ListParams } from 'src/app/common/repository/interfaces/list-params';
import { HttpService } from 'src/app/common/services/http.service';
import { IFormScheduledDetail } from 'src/app/pages/judicial-physical-reception/scheduled-maintenance-1/scheduled-maintenance-detail/interfaces';
import { firstFormatDate } from 'src/app/shared/utils/date';
import { IListResponse } from '../../interfaces/list-response.interface';
import {
  IDetailIndicatorGood,
  IGoodsByProceeding,
} from '../../models/ms-indicator-goods/ms-indicator-goods-interface';

@Injectable({
  providedIn: 'root',
})
export class MsIndicatorGoodsService extends HttpService {
  private readonly endpoint = EIndicatorGoodsEndpoints.Detail;
  constructor() {
    super();
    this.microservice = EIndicatorGoodsEndpoints.BasePath;
  }

  update(model: IDetailIndicatorGood) {
    return this.put(this.endpoint, model);
  }

  // updateMassive(
  //   selecteds: {
  //     fec_aprobacion_x_admon: string;
  //     fec_indica_usuario_aprobacion: string;
  //     no_bien: string;
  //   }[],
  //   numberProceedings: number
  // ) {
  //   return forkJoin(
  //     selecteds.map(selected => {
  //       return this.getById(+selected.no_bien, numberProceedings).pipe(
  //         mergeMap(detail => {
  //           return this.put(this.endpoint, {
  //             ...detail,
  //             approvedDateXAdmon: selected.fec_aprobacion_x_admon,
  //             dateIndicatesUserApproval: selected.fec_indica_usuario_aprobacion,
  //             numberGood: selected.no_bien,
  //           });
  //         })
  //       );
  //     })
  //   );
  // }

  getGoodsByProceeding(params?: ListParams) {
    return this.get<IListResponse<IGoodsByProceeding>>(
      this.endpoint + '/' + EIndicatorGoodsEndpoints.GoodsByEvent,
      params
    ).pipe(
      map(items => {
        const data = items.data;
        return {
          ...items,
          data: data.map(item => {
            return {
              ...item,
              fec_aprobacion_x_admon: firstFormatDate(
                new Date(item.fec_aprobacion_x_admon)
              ),
              fec_indica_usuario_aprobacion: firstFormatDate(
                new Date(item.fec_indica_usuario_aprobacion)
              ),
            };
          }),
        };
      })
    );
  }

  getExcel(detail: IFormScheduledDetail) {
    const params = new ListParams();
    params.limit = 100000;
    params['id'] = detail.acta;
    return this.getGoodsByProceeding(params).pipe(
      map(items => {
        const data = items.data;
        return data.map((item, index) => {
          return {
            PROGRAMA: detail.claveActa,
            'LOCALIDAD/DICTAMEN': item.ciudad_transferente,
            NO_BIEN: item.no_bien,
            ESTATUS: item.estatus,
            DESCRIPCION: item.descripcion,
            TIPO_BIEN: item.tipo_bien,
            EXPEDIENTE: item.no_expediente,
            EVENTO: index + 1,
            CANTIDAD: item.cantidad,
            FEC_RECEPCION: item.fec_aprobacion_x_admon,
            FEC_FINALIZACION: item.fec_indica_usuario_aprobacion,
            INDICADOR_DEST: item.destino,
          };
        });
      })
    );
  }
}
