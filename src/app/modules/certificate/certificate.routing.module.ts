import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from 'src/app/core';
import { CreateCAComponent } from './components/create-ca/create-ca.component';
import { ListCAComponent  } from './components/list-ca/list-ca.component';
 
const routes: Routes = [
    { path: 'certificates', component: ListCAComponent, canActivate: [AuthGuardService] },
    { path: 'certificates/createca', component: CreateCAComponent, canActivate: [AuthGuardService] },
];
 
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CertificateRoutingModule {}