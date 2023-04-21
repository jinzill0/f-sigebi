import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject, takeUntil, tap } from 'rxjs';
import { TABLE_SETTINGS } from 'src/app/common/constants/table-settings';
import {
  FilterParams,
  ListParams,
  SearchFilter,
} from 'src/app/common/repository/interfaces/list-params';
import { ExcelService } from 'src/app/common/services/excel.service';
import { IRequestTask } from 'src/app/core/models/requests/request-task.model';
import { AuthService } from 'src/app/core/services/authentication/auth.service';
import { TaskService } from 'src/app/core/services/ms-task/task.service';
import { BasePage } from 'src/app/core/shared/base-page';
import { NUMBERS_PATTERN, STRING_PATTERN } from 'src/app/core/shared/patterns';
import { REQUEST_LIST_COLUMNS } from 'src/app/pages/siab-web/sami/consult-tasks/consult-tasks/consult-tasks-columns';
@Component({
  selector: 'app-consult-tasks',
  templateUrl: './consult-tasks.component.html',
  styles: [],
})
export class ConsultTasksComponent extends BasePage implements OnInit {
  params = new BehaviorSubject<ListParams>(new ListParams());
  filterParams = new BehaviorSubject<FilterParams>(new FilterParams());

  totalItems: number = 0;
  tasks: IRequestTask[] = [];

  loadingText = '';
  userName = '';
  consultTasksForm: FormGroup;

  constructor(
    private taskService: TaskService,
    private authService: AuthService,
    private excelService: ExcelService,
    public router: Router,
    private fb: FormBuilder
  ) {
    super();
    this.settings = { ...TABLE_SETTINGS, actions: false, selectMode: '' };
    this.settings.columns = REQUEST_LIST_COLUMNS;
  }

  ngOnInit(): void {
    this.prepareForm();
  }

  private prepareForm() {
    this.userName = this.authService.decodeToken().preferred_username;

    this.consultTasksForm = this.fb.group({
      unlinked: [null, Validators.required],
      unlinked1: [null, Validators.required],
      txtSearch: [
        '',
        [Validators.pattern(STRING_PATTERN), Validators.maxLength(40)],
      ],
      txtTituloTarea: [
        '',
        [Validators.pattern(STRING_PATTERN), Validators.maxLength(40)],
      ],
      txtNoProgramacionEntrega: ['', Validators.pattern(NUMBERS_PATTERN)],
      txtNombreActividad: [
        '',
        [Validators.pattern(STRING_PATTERN), Validators.maxLength(40)],
      ],
      txtNoOrdenServicio: ['', Validators.pattern(NUMBERS_PATTERN)],
      txtAsignado: [
        '',
        [Validators.pattern(STRING_PATTERN), Validators.maxLength(40)],
      ],
      txtNoOrdenPago: ['', Validators.pattern(NUMBERS_PATTERN)],
      txtAprobador: [
        '',
        [Validators.pattern(STRING_PATTERN), Validators.maxLength(40)],
      ],
      txtNoOrdenIngreso: ['', Validators.pattern(NUMBERS_PATTERN)],
      txtNombreAplicacion: [
        '',
        [Validators.pattern(STRING_PATTERN), Validators.maxLength(40)],
      ],
      txtNoMuestreo: ['', Validators.pattern(NUMBERS_PATTERN)],
      txtFecAsigDesde: [
        '',
        [Validators.pattern(STRING_PATTERN), Validators.maxLength(40)],
      ],
      txtFecAsigHasta: [
        '',
        [Validators.pattern(STRING_PATTERN), Validators.maxLength(40)],
      ],
      txtNoMuestreoOrden: ['', Validators.pattern(NUMBERS_PATTERN)],
      txtFechaFinDesde: [''],
      txtFechaFinHasta: [''],
      txtNoDelegacionRegional: ['', Validators.pattern(NUMBERS_PATTERN)],
      txtNoSolicitud: ['', Validators.pattern(NUMBERS_PATTERN)],
      txtNoTransferente: ['', Validators.pattern(NUMBERS_PATTERN)],
      txtNoProgramacion: ['', Validators.pattern(NUMBERS_PATTERN)],
    });

    this.params
      .pipe(
        takeUntil(this.$unSubscribe),
        tap(() => this.getTasks())
      )
      .subscribe();
  }

  exportToExcel() {
    const filename: string = this.userName + '-Tasks';
    // El type no es necesario ya que por defecto toma 'xlsx'
    this.excelService.export(this.tasks, { filename });
  }

  getTasks() {
    let isfilterUsed = false;
    const params = this.params.getValue();
    console.log(params);
    this.filterParams.getValue().removeAllFilters();
    this.filterParams.getValue().page = params.page;
    this.filterParams
      .getValue()
      .addFilter('State', 'FINALIZADA', SearchFilter.ILIKE);

    if (this.consultTasksForm.value.txtTituloTarea) {
      isfilterUsed = true;
      this.filterParams
        .getValue()
        .addFilter(
          'title',
          this.consultTasksForm.value.txtTituloTarea,
          SearchFilter.ILIKE
        );
    }
    if (this.consultTasksForm.value.txtNoProgramacionEntrega) {
      isfilterUsed = true;
      this.filterParams
        .getValue()
        .addFilter(
          'programmingId',
          this.consultTasksForm.value.txtNoProgramacionEntrega,
          SearchFilter.ILIKE
        );
    }
    if (this.consultTasksForm.value.txtNombreActividad) {
      isfilterUsed = true;
      this.filterParams
        .getValue()
        .addFilter(
          'activityName',
          this.consultTasksForm.value.txtNombreActividad,
          SearchFilter.ILIKE
        );
    }
    if (this.consultTasksForm.value.txtNoOrdenServicio) {
      isfilterUsed = true;
      this.filterParams
        .getValue()
        .addFilter(
          '-OrdenServicio',
          this.consultTasksForm.value.txtNoOrdenServicio,
          SearchFilter.ILIKE
        );
    }
    if (this.consultTasksForm.value.txtAsignado || this.userName) {
      // isfilterUsed = true;
      this.filterParams
        .getValue()
        .addFilter(
          'assignees',
          this.consultTasksForm.value.txtAsignado || this.userName,
          SearchFilter.ILIKE
        );
    }
    if (this.consultTasksForm.value.txtNoOrdenPago) {
      isfilterUsed = true;
      this.filterParams
        .getValue()
        .addFilter(
          '-OrdenPago',
          this.consultTasksForm.value.txtNoOrdenPago,
          SearchFilter.ILIKE
        );
    }
    if (this.consultTasksForm.value.txtAprobador) {
      isfilterUsed = true;
      this.filterParams
        .getValue()
        .addFilter(
          'approvers',
          this.consultTasksForm.value.txtAprobador,
          SearchFilter.ILIKE
        );
    }
    if (this.consultTasksForm.value.txtNoOrdenIngreso) {
      isfilterUsed = true;
      this.filterParams
        .getValue()
        .addFilter(
          '-OrdenIngreso',
          this.consultTasksForm.value.txtNoOrdenIngreso,
          SearchFilter.ILIKE
        );
    }
    if (this.consultTasksForm.value.txtNombreAplicacion) {
      isfilterUsed = true;
      this.filterParams
        .getValue()
        .addFilter(
          'applicationName',
          this.consultTasksForm.value.txtNombreAplicacion,
          SearchFilter.ILIKE
        );
    }
    if (this.consultTasksForm.value.txtNoMuestreo) {
      isfilterUsed = true;
      this.filterParams
        .getValue()
        .addFilter(
          '-NoMuestreo',
          this.consultTasksForm.value.txtNoMuestreo,
          SearchFilter.ILIKE
        );
    }
    if (
      this.consultTasksForm.value.txtFecAsigDesde &&
      this.consultTasksForm.value.txtFecAsigHasta
    ) {
      isfilterUsed = true;
      const fechaInicio = this.consultTasksForm.value.txtFecAsigDesde;
      const fechaFin = this.consultTasksForm.value.txtFecAsigHasta;

      const inicio =
        fechaInicio instanceof Date
          ? fechaInicio.toISOString().split('T')[0]
          : fechaInicio;
      const final = fechaFin
        ? fechaFin.toISOString().split('T')[0]
        : new Date().toISOString().split('T')[0];

      this.filterParams
        .getValue()
        .addFilter('assignedDate', inicio + ',' + final, SearchFilter.BTW);
    }
    if (this.consultTasksForm.value.txtNoMuestreoOrden) {
      isfilterUsed = true;
      this.filterParams
        .getValue()
        .addFilter(
          '-NoMuestreoOrden',
          this.consultTasksForm.value.txtNoMuestreoOrden,
          SearchFilter.ILIKE
        );
    }
    if (this.consultTasksForm.value.txtFechaFinDesde) {
      isfilterUsed = true;
      const fechaInicio = this.consultTasksForm.value.txtFechaFinDesde;
      const fechaFin = this.consultTasksForm.value.txtFechaFinHasta;

      const inicio =
        fechaInicio instanceof Date
          ? fechaInicio.toISOString().split('T')[0]
          : fechaInicio;
      const final = fechaFin
        ? fechaFin.toISOString().split('T')[0]
        : new Date().toISOString().split('T')[0];

      this.filterParams
        .getValue()
        .addFilter('endDate', inicio + ',' + final, SearchFilter.BTW);
    }
    if (this.consultTasksForm.value.txtNoDelegacionRegional) {
      isfilterUsed = true;
      this.filterParams
        .getValue()
        .addFilter(
          'regionalDelegationId',
          this.consultTasksForm.value.txtNoDelegacionRegional,
          SearchFilter.ILIKE
        );
    }
    if (this.consultTasksForm.value.txtNoSolicitud) {
      isfilterUsed = true;
      this.filterParams
        .getValue()
        .addFilter(
          '-NoSolicitud',
          this.consultTasksForm.value.txtNoSolicitud,
          SearchFilter.ILIKE
        );
    }
    if (this.consultTasksForm.value.txtNoTransferente) {
      isfilterUsed = true;
      this.filterParams
        .getValue()
        .addFilter(
          'transferenceId',
          this.consultTasksForm.value.txtNoTransferente,
          SearchFilter.ILIKE
        );
    }
    if (this.consultTasksForm.value.txtNoProgramacion) {
      isfilterUsed = true;
      this.filterParams
        .getValue()
        .addFilter(
          'programmingId',
          this.consultTasksForm.value.txtNoProgramacion,
          SearchFilter.ILIKE
        );
    }

    console.log(
      'this.filterParams: ',
      this.filterParams.getValue().getParams()
    );

    this.loading = true;
    this.loadingText = 'Cargando';

    params.text = this.consultTasksForm.value.txtSearch;
    params['others'] = this.userName;

    this.tasks = [];
    this.totalItems = 0;

    this.taskService
      .getTasksByUser(this.filterParams.getValue().getParams())
      .subscribe({
        next: response => {
          console.log('Response: ', response);
          this.loading = false;
          console.log('Hay un filtro activo? ', isfilterUsed);
          // if (!isfilterUsed) {
          //   this.tasks = response.data.filter(
          //     (record: { State: string }) => record.State != 'FINALIZADA'
          //   );
          //   this.totalItems = this.tasks.length;
          // } else {
          //   this.tasks = response.data;
          //   this.totalItems = response.count;
          // }
          this.tasks = response.data;
          this.totalItems = response.count;
        },
        error: () => ((this.tasks = []), (this.loading = false)),
      });
  }

  cleanFilter() {
    this.consultTasksForm.reset();
    this.consultTasksForm.updateValueAndValidity();
    this.consultTasksForm.controls['txtSearch'].setValue('');
    this.getTasks();
  }

  onKeydown(event: any) {
    console.log('Apreto enter event', event);
    this.getTasks();
  }

  openTask(selected: any): void {
    let obj2Storage = {
      assignees: selected.assignees,
      displayName: this.userName,
      taskId: selected.requestId,
      id: selected.id,
    };

    localStorage.setItem(`Task`, JSON.stringify(obj2Storage));

    if (selected.requestId !== null || selected.urlNb !== null) {
      let url = `${selected.urlNb}/${selected.requestId}`;
      this.router.navigateByUrl(url);
    } else {
      this.alert('warning', 'No disponible', 'Tarea no disponible');
    }
  }
}
