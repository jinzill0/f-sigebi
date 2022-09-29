import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ENDPOINT_LINKS } from '../../common/constants/endpoints';
import { ICrudMethods } from '../../common/repository/interfaces/crud-methods';
import { ListParams } from '../../common/repository/interfaces/list-params';
import { Repository } from '../../common/repository/repository';
import { IListResponse } from '../interfaces/list-response';
import { IDrawer } from '../models/drawer.model';
@Injectable({
  providedIn: 'root',
})
export class DrawerService implements ICrudMethods<IDrawer> {
  private readonly route: string = ENDPOINT_LINKS.Drawer;
  constructor(private drawerRepository: Repository<IDrawer>) {}

  getAll(params?: ListParams): Observable<IListResponse<IDrawer>> {
    return this.drawerRepository.getAllPaginated(this.route, params);
  }

  getById(id: string | number): Observable<IDrawer> {
    return this.drawerRepository.getById(this.route, id);
  }

  create(model: IDrawer): Observable<IDrawer> {
    return this.drawerRepository.create(this.route, model);
  }

  update(id: string | number, model: IDrawer): Observable<Object> {
    return this.drawerRepository.update(this.route, id, model);
  }

  remove(id: string | number): Observable<Object> {
    return this.drawerRepository.remove(this.route, id);
  }
}
