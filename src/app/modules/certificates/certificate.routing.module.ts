import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CaComponent } from './components/ca/ca.component';
 
const routes: Routes = [
    { path: 'ca', component: CaComponent },
];
 
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CertificateRoutingModule {}