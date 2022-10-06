import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { async } from 'rxjs';

const routes: Routes = [
  {
    path: 'documentation',
    loadChildren: async () =>
      (await import('./documentation-examples/documentation-examples.module')).DocumentationExamplesModule,
      data: { title: 'Documentation' }
  },
  {
    path: 'example',
    loadChildren: async () =>
      (await import('./example/example.module')).ExampleModule,
    data: { title: 'Ejemplo' },
  },
  {
    path: 'request',
    loadChildren: async () =>
      (await import('./request/request.module')).RequestModule,
    data: { title: 'Request' },
  },
  {
    path: 'catalogs',
    loadChildren: async () =>
      (await import('./catalogs/catalogs.module')).CatalogModule,
  },
  {
    path: 'administrative-processes',
    loadChildren: async () =>
      (await import('./administrative-processes/administrative-processes.module')).AdministrativeProcessesModule,
  },
  {
    path: 'home',
    loadChildren: async () =>
      (await import('./admin/home/home.module')).HomeModule,
    data: { title: 'Inicio' },
  },
  
  {
    path: 'final-destination-process',
    loadChildren: async() =>
    (await import('./final-destination-process/final-destination-process.module')).FinalDestinationProcessModule,
    data: { Title: 'Destino final' },
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'executive-processes',
    loadChildren: async () =>
      (await import('./executive-processes/executive-processes.module')).ExecutiveProcessesModule,
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
