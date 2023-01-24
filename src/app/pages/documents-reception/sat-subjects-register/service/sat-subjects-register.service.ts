import { Injectable } from '@angular/core';
//httpClient
import { HttpClient } from '@angular/common/http';
//params
import { ListParams } from 'src/app/common/repository/interfaces/list-params';
//services
import { DelegationService } from 'src/app/core/services/catalogs/delegation.service';
import { ProcedureManagementService } from 'src/app/core/services/proceduremanagement/proceduremanagement.service';
import { SatInterfaceService } from 'src/app/core/services/sat-interface/sat-interface.service';

@Injectable({
  providedIn: 'root',
})
export class SatSubjectsRegisterService {
  constructor(
    private httClient: HttpClient,
    private satInterfaceService: SatInterfaceService,
    private delegationService: DelegationService,
    private procedureManagementRepository: ProcedureManagementService
  ) {}

  /**
   * Funciones de Catalogos
   */

  /**
   * Obtener el listado de Coordinadores de acuerdo a los criterios de búsqueda
   * @param params Parametos de busqueda de tipo @ListParams
   * @returns
   */
  getCoordinadorBySearch(params: ListParams) {
    return this.delegationService.getAll(params);
  }

  /**
   * Funciones de Gestión Trámite Sat
   */

  /**
   * Obtener el resultado de la busqueda para el listado de gestion tramite SAT
   * @param params Parametos de busqueda de tipo @ListParams
   * @returns
   */
  getGestionTramiteSatBySearch(params: ListParams) {
    console.log(params);

    return this.procedureManagementRepository.getManagamentProcessSat(params);
  }

  /**
   * Funciones de Sat Transferencia
   */

  /**
   * Obtener el resultado de la busqueda para el listado de transferencias SAT
   * @param params Parametos de busqueda de tipo @ListParams
   * @returns
   */
  getSatTransferenciaBySearch(params: ListParams) {
    return this.satInterfaceService.getVSatTransferencia(params);
  }
}
