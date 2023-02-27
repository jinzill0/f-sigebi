import { Injectable } from '@angular/core';
import { IDocReceptionFlyersRegistrationParams } from 'src/app/pages/documents-reception/flyers/documents-reception-register/interfaces/documents-reception-register-form';
import {
  IDocumentsReceptionRegisterForm,
  IGoodsBulkLoadPgrSaeParams,
  IGoodsBulkLoadSatSaeParams,
  IGoodsCaptureTempParams,
} from '../../../pages/documents-reception/flyers/documents-reception-register/interfaces/documents-reception-register-form';

@Injectable({
  providedIn: 'root',
})
export class DocumentsReceptionDataService {
  private _flyersRegistrationParams: IDocReceptionFlyersRegistrationParams =
    null;

  private _goodsBulkLoadSatSaeParams: IGoodsBulkLoadSatSaeParams = {
    asuntoSat: null,
    pNoExpediente: null,
    pNoOficio: null,
    pNoVolante: null,
    pSatTipoExp: null,
    pIndicadorSat: null,
  };

  private _goodsBulkLoadPgrSaeParams: IGoodsBulkLoadPgrSaeParams = {
    pNoExpediente: null,
    pNoVolante: null,
    pAvPrevia: null,
  };

  private _goodsCaptureTempParams: IGoodsCaptureTempParams = {
    iden: null,
    noTransferente: null,
    desalojo: null,
    pNoVolante: null,
    pNoOficio: null,
    asuntoSat: null,
  };

  private _documentsReceptionRegisterForm: Partial<IDocumentsReceptionRegisterForm> =
    null;

  constructor() {}

  get flyersRegistrationParams() {
    return { ...this._flyersRegistrationParams };
  }

  get goodsBulkLoadSatSaeParams() {
    return { ...this._goodsBulkLoadSatSaeParams };
  }

  get goodsBulkLoadPgrSaeParams() {
    return { ...this._goodsBulkLoadPgrSaeParams };
  }

  get goodsCaptureTempParams() {
    return { ...this._goodsCaptureTempParams };
  }

  get documentsReceptionRegisterForm() {
    if (this._documentsReceptionRegisterForm === null) return null;
    return { ...this._documentsReceptionRegisterForm };
  }

  set flyersRegistrationParams(params: IDocReceptionFlyersRegistrationParams) {
    this._flyersRegistrationParams = params;
  }

  set goodsBulkLoadSatSaeParams(params: IGoodsBulkLoadSatSaeParams) {
    this._goodsBulkLoadSatSaeParams = params;
  }

  set goodsBulkLoadPgrSaeParams(params: IGoodsBulkLoadPgrSaeParams) {
    this._goodsBulkLoadPgrSaeParams = params;
  }

  set goodsCaptureTempParams(params: IGoodsCaptureTempParams) {
    this._goodsCaptureTempParams = params;
  }

  set documentsReceptionRegisterForm(
    form: Partial<IDocumentsReceptionRegisterForm>
  ) {
    this._documentsReceptionRegisterForm = form;
  }

  setFlyersRegParam<
    ParamKey extends keyof IDocReceptionFlyersRegistrationParams
  >(param: ParamKey, value: IDocReceptionFlyersRegistrationParams[ParamKey]) {
    this._flyersRegistrationParams[param] = value;
  }

  setFieldDocumentsReceptionRegisterForm<
    ParamKey extends keyof IDocumentsReceptionRegisterForm
  >(param: ParamKey, value: IDocumentsReceptionRegisterForm[ParamKey]) {
    if (this._documentsReceptionRegisterForm === null) return;
    this._documentsReceptionRegisterForm[param] = value;
  }
}
