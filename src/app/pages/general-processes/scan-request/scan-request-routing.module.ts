import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ScanDocumentsComponent } from './components/scan-documents/scan-documents.component';
import { ScanRequestComponent } from './scan-request/scan-request.component';

const routes: Routes = [
  {
    path: '',
    component: ScanRequestComponent,
  },
  {
    path: ':P_NO_VOLANTE',
    component: ScanRequestComponent,
  },
  {
    path: 'scan',
    component: ScanDocumentsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ScanRequestRoutingModule {}
