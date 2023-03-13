import { Injectable } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { ENDPOINT_LINKS } from 'src/app/common/constants/endpoints';
import { GoodEndpoints } from 'src/app/common/constants/endpoints/ms-good-endpoints';
import { UserEndpoints } from 'src/app/common/constants/endpoints/ms-users-endpoints';
import { HttpService } from 'src/app/common/services/http.service';
import { IListResponse } from 'src/app/core/interfaces/list-response.interface';
import { IAffair } from 'src/app/core/models/catalogs/affair.model';
import { IAuthority } from 'src/app/core/models/catalogs/authority.model';
import { IDepartment } from 'src/app/core/models/catalogs/department.model';
import { IIdentifier } from 'src/app/core/models/catalogs/identifier.model';
import { IMinpub } from 'src/app/core/models/catalogs/minpub.model';
import { IStation } from 'src/app/core/models/catalogs/station.model';
import {
  ITransferente,
  ITransferingLevelView,
} from 'src/app/core/models/catalogs/transferente.model';
import { IGood } from 'src/app/core/models/ms-good/good';
import { ConvertiongoodEndpoints } from '../../../common/constants/endpoints/ms-convertiongood-endpoints';
import { DocumentsEndpoints } from '../../../common/constants/endpoints/ms-documents-endpoints';
import { ListParams } from '../../../common/repository/interfaces/list-params';
import { Repository } from '../../../common/repository/repository';
import { ICity } from '../../models/catalogs/city.model';
import { IIndiciados } from '../../models/catalogs/indiciados.model';
import { IDocuments } from '../../models/ms-documents/documents';
import { IUserAccessAreaRelational } from '../../models/ms-users/seg-access-area-relational.model';
import { AuthorityService } from '../catalogs/authority.service';
import { CourtService } from '../catalogs/court.service';
import { DelegationService } from '../catalogs/delegation.service';
import { IndiciadosService } from '../catalogs/indiciados.service';
import { MinPubService } from '../catalogs/minpub.service';
import { StationService } from '../catalogs/station.service';
import { TransferenteService } from '../catalogs/transferente.service';
import { DynamicTablesService } from '../dynamic-catalogs/dynamic-tables.service';
import { ProcedureManagementService } from '../proceduremanagement/proceduremanagement.service';

@Injectable({
  providedIn: 'root',
})
export class DocReceptionRegisterService extends HttpService {
  microsevice: string = '';
  constructor(
    private delegationService: DelegationService,
    private cityRepository: Repository<ICity>,
    private dynamicTablesService: DynamicTablesService,
    private transferentService: TransferenteService,
    private stationService: StationService,
    private authorityService: AuthorityService,
    private minPubService: MinPubService,
    private courtService: CourtService,
    private procedureManageService: ProcedureManagementService,
    private indiciadosService: IndiciadosService
  ) {
    super();
  }

  getStations(params?: string): Observable<IListResponse<IStation>> {
    let partials = ENDPOINT_LINKS.Station.split('/');
    this.microservice = partials[0];
    return this.get<IListResponse<IStation>>(partials[1], params).pipe(
      map(data => {
        return {
          ...data,
          data: data.data.map(s => {
            return { ...s, nameAndId: `${s.id} - ${s.stationName}` };
          }),
        };
      }),
      tap(() => (this.microservice = ''))
    );
  }

  getAuthorities(params?: string): Observable<IListResponse<IAuthority>> {
    let partials = ENDPOINT_LINKS.Authority.split('/');
    this.microservice = partials[0];
    return this.get<IListResponse<IAuthority>>(partials[1], params).pipe(
      map(data => {
        return {
          ...data,
          data: data.data.map(a => {
            return { ...a, nameAndId: `${a.idAuthority} - ${a.authorityName}` };
          }),
        };
      }),
      tap(() => (this.microservice = ''))
    );
  }

  getPublicMinistries(params?: string): Observable<IListResponse<IMinpub>> {
    let partials = ENDPOINT_LINKS.MinPub.split('/');
    this.microservice = partials[0];
    return this.get<IListResponse<IMinpub>>(partials[1], params).pipe(
      map(data => {
        return {
          ...data,
          data: data.data.map(m => {
            return { ...m, nameAndId: `${m.id} - ${m.description}` };
          }),
        };
      }),
      tap(() => (this.microservice = ''))
    );
  }

  getIdentifiers(params?: string): Observable<IListResponse<IIdentifier>> {
    let partials = ENDPOINT_LINKS.Identifier.split('/');
    this.microservice = partials[0];
    return this.get<IListResponse<IIdentifier>>(partials[1], params).pipe(
      tap(() => (this.microservice = ''))
    );
  }

  getTransferents(params?: string): Observable<IListResponse<ITransferente>> {
    let partials = ENDPOINT_LINKS.Transferente.split('/');
    this.microservice = partials[0];
    return this.get<IListResponse<ITransferente>>(partials[1], params).pipe(
      tap(() => (this.microservice = ''))
    );
  }

  getActiveTransferents(body: {
    active: string[];
    nameTransferent: string;
  }): Observable<IListResponse<ITransferente>> {
    let partials = ENDPOINT_LINKS.Transferente.split('/');
    this.microservice = partials[0];
    const route = `transferent/active/not-in`;
    return this.post<IListResponse<ITransferente>>(route, body).pipe(
      map(data => {
        return {
          ...data,
          data: data.data.map(t => {
            return { ...t, nameAndId: `${t.id} - ${t.nameTransferent}` };
          }),
        };
      }),
      tap(() => (this.microservice = ''))
    );
  }

  getDepartaments(
    self?: DocReceptionRegisterService,
    params?: string
  ): Observable<IListResponse<IDepartment>> {
    let partials = ENDPOINT_LINKS.Departament.split('/');
    self.microservice = partials[0];
    return self
      .get<IListResponse<IDepartment>>(partials[1], params)
      .pipe(tap(() => (this.microservice = '')));
  }

  getDepartamentsFiltered(
    params?: string
  ): Observable<IListResponse<IDepartment>> {
    let partials = ENDPOINT_LINKS.Departament.split('/');
    this.microservice = partials[0];
    return this.get<IListResponse<IDepartment>>(partials[1], params).pipe(
      tap(() => (this.microservice = ''))
    );
  }

  getAffairs(
    self?: DocReceptionRegisterService,
    params?: string
  ): Observable<IListResponse<IAffair>> {
    let partials = ENDPOINT_LINKS.Affair.split('/');
    self.microservice = partials[0];
    return self
      .get<IListResponse<IAffair>>(partials[1], params)
      .pipe(tap(() => (this.microservice = '')));
  }

  getAffairsFiltered(params?: string): Observable<IListResponse<IAffair>> {
    let partials = ENDPOINT_LINKS.Affair.split('/');
    this.microservice = partials[0];
    return this.get<IListResponse<IAffair>>(partials[1], params).pipe(
      tap(() => (this.microservice = ''))
    );
  }

  getManagementAreasFiltered(params?: string) {
    return this.procedureManageService.getManagementAreasFiltered(params).pipe(
      map(data => {
        return {
          ...data,
          data: data.data.map(a => {
            return { ...a, nameAndId: `${a.id} - ${a.description}` };
          }),
        };
      })
    );
  }

  getUsersSegAreas(
    params?: string
  ): Observable<IListResponse<IUserAccessAreaRelational>> {
    this.microservice = UserEndpoints.BasePath;
    return this.get<IListResponse<IUserAccessAreaRelational>>(
      UserEndpoints.SegAccessAreas,
      params
    ).pipe(
      map(data => {
        return {
          ...data,
          data: data.data.map(u => {
            return { ...u, userAndName: `${u.user} - ${u.userDetail.name}` };
          }),
        };
      }),
      tap(() => (this.microservice = ''))
    );
  }

  getUniqueKeyData(
    params?: string
  ): Observable<IListResponse<ITransferingLevelView>> {
    let partials = ENDPOINT_LINKS.Transferente.split('/');
    this.microservice = partials[0];
    const route = `${partials[1]}/transferring-levels-view`;
    return this.get<IListResponse<ITransferingLevelView>>(route, params).pipe(
      tap(() => (this.microservice = ''))
    );
  }

  getUniqueKeyDataModal(
    self?: DocReceptionRegisterService,
    params?: string
  ): Observable<IListResponse<ITransferingLevelView>> {
    let partials = ENDPOINT_LINKS.Transferente.split('/');
    self.microservice = partials[0];
    const route = `${partials[1]}/transferring-levels-view`;
    return self
      .get<IListResponse<ITransferingLevelView>>(route, params)
      .pipe(tap(() => (self.microservice = '')));
  }

  getGoods(params?: string): Observable<IListResponse<IGood>> {
    this.microservice = GoodEndpoints.Good;
    return this.get<IListResponse<IGood>>(GoodEndpoints.Good, params).pipe(
      tap(() => (this.microservice = ''))
    );
  }

  updateGood(body: Partial<IGood>): Observable<IGood> {
    this.microservice = GoodEndpoints.Good;
    return this.put(GoodEndpoints.Good, body).pipe(
      tap(() => (this.microservice = ''))
    );
  }

  deleteGoodByExpedient(expedient: number) {
    return this.delete(`${GoodEndpoints.DeleteByExpedient}/${expedient}`);
  }

  getUserOfficePermission(body: {
    toolbarUser: string;
  }): Observable<{ val_usr: number }> {
    this.microservice = ConvertiongoodEndpoints.Convertiongood;
    return this.post<{ val_usr: string }>(`query/toolbar-usuario`, body).pipe(
      map(resp => {
        return { val_usr: Number(resp.val_usr) };
      }),
      tap(() => {
        this.microservice = '';
      })
    );
  }

  getUserByDelegation(
    delegation: number
  ): Observable<{ user: string; name: string }> {
    this.microservice = UserEndpoints.BasePath;
    return this.get(`${UserEndpoints.GetUserName}/${delegation}`).pipe(
      tap(() => (this.microservice = ''))
    );
  }

  getDocuments(
    self?: DocReceptionRegisterService,
    params?: string
  ): Observable<IListResponse<IDocuments>> {
    self.microservice = DocumentsEndpoints.Documents;
    return self
      .get<IListResponse<IDocuments>>(DocumentsEndpoints.Documents, params)
      .pipe(
        tap(resp => {
          this.microservice = '';
          console.log(params, resp);
        })
      );
  }

  getCities(params?: ListParams): Observable<IListResponse<ICity>> {
    let partials = ENDPOINT_LINKS.City.split('/');
    this.microservice = partials[0];
    const route = partials[1];
    return this.get<IListResponse<ICity>>(route, params).pipe(
      map(data => {
        return {
          ...data,
          data: data.data.map(c => {
            return { ...c, nameAndId: `${c.idCity} - ${c.nameCity}` };
          }),
        };
      }),
      tap(() => (this.microservice = ''))
    );
  }

  getCity(id: string | number): Observable<ICity> {
    return this.cityRepository.getById(ENDPOINT_LINKS.City, id).pipe(
      map(data => {
        return {
          ...data,
          nameAndId: `${data.idCity} - ${data.nameCity}`,
        };
      })
    );
  }

  getDynamicTables(id: number | string, params: ListParams) {
    return this.dynamicTablesService.getTvalTable1ByTableKey(id, params).pipe(
      map(data => {
        return {
          ...data,
          data: data.data.map(t => {
            return { ...t, otKeyAndValue: `${t.otKey} - ${t.value}` };
          }),
        };
      })
    );
  }

  getByTableKeyOtKey(tableKey: number | string, OtKey: number | string) {
    return this.dynamicTablesService.getByTableKeyOtKey(tableKey, OtKey).pipe(
      map(data => {
        return {
          ...data,
          data: {
            ...data.data,
            otKeyAndValue: `${data.data.otKey} - ${data.data.value}`,
          },
        };
      })
    );
  }

  getTransferent(id: string | number) {
    return this.transferentService.getById(id).pipe(
      map(data => {
        return {
          ...data,
          nameAndId: `${data.id} - ${data.nameTransferent}`,
        };
      })
    );
  }

  getStation(id: string | number) {
    return this.stationService.getById(id).pipe(
      map(data => {
        return {
          ...data,
          nameAndId: `${data.id} - ${data.stationName}`,
        };
      })
    );
  }

  getAuthoritiesFilter(params?: string) {
    return this.authorityService.getAllFilter(params).pipe(
      map(data => {
        return {
          ...data,
          data: data.data.map(a => {
            return { ...a, nameAndId: `${a.idAuthority} - ${a.authorityName}` };
          }),
        };
      })
    );
  }

  getMinPub(id: string | number) {
    return this.minPubService.getById(id).pipe(
      map(data => {
        return {
          ...data,
          nameAndId: `${data.id} - ${data.description}`,
        };
      })
    );
  }

  getCourts(params?: ListParams) {
    return this.courtService.getAll(params).pipe(
      map(data => {
        return {
          ...data,
          data: data.data.map(c => {
            return { ...c, nameAndId: `${c.id} - ${c.description}` };
          }),
        };
      })
    );
  }

  getCourt(id: string | number) {
    return this.courtService.getById(id).pipe(
      map(data => {
        return {
          ...data,
          nameAndId: `${data.id} - ${data.description}`,
        };
      })
    );
  }

  getDefendants(params?: ListParams): Observable<IListResponse<IIndiciados>> {
    let partials = ENDPOINT_LINKS.Indiciados.split('/');
    this.microservice = partials[0];
    const route = partials[1];
    return this.get<IListResponse<IIndiciados>>(route, params).pipe(
      map(data => {
        return {
          ...data,
          data: data.data.map(c => {
            return { ...c, nameAndId: `${c.id} - ${c.name}` };
          }),
        };
      }),
      tap(() => (this.microservice = ''))
    );
  }

  getDefendant(id: string | number) {
    return this.indiciadosService.getById(id).pipe(
      map(data => {
        return {
          ...data,
          nameAndId: `${data.id} - ${data.name}`,
        };
      })
    );
  }
}
