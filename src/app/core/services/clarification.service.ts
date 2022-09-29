import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ENDPOINT_LINKS } from '../../common/constants/endpoints';
import { ICrudMethods } from '../../common/repository/interfaces/crud-methods';
import { ListParams } from '../../common/repository/interfaces/list-params';
import { Repository } from '../../common/repository/repository';
import { IListResponse } from '../interfaces/list-response';
import { IClarification } from '../models/clarification.model';
@Injectable({
  providedIn: 'root',
})
export class ClarificationService implements ICrudMethods<IClarification> {
  private readonly route: string = ENDPOINT_LINKS.Clarification;
  constructor(private clarificationRepository: Repository<IClarification>) {}

  getAll(params?: ListParams): Observable<IListResponse<IClarification>> {
    return this.clarificationRepository.getAllPaginated(this.route, params);
  }

  getById(id: string | number): Observable<IClarification> {
    return this.clarificationRepository.getById(this.route, id);
  }

  create(model: IClarification): Observable<IClarification> {
    return this.clarificationRepository.create(this.route, model);
  }

  update(id: string | number, model: IClarification): Observable<Object> {
    return this.clarificationRepository.update(this.route, id, model);
  }

  remove(id: string | number): Observable<Object> {
    return this.clarificationRepository.remove(this.route, id);
  }
}
