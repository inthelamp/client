import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from 'src/app/core';
import { CreateComponent } from './components/create/create.component';
import { ListComponent  } from './components/list/list.component';
 
const routes: Routes = [
    { path: 'certificates', component: ListComponent, canActivate: [AuthGuardService] },
    { path: 'certificates/create', component: CreateComponent, canActivate: [AuthGuardService] },
];
 
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CertificatesRoutingModule {}