import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from 'src/app/core';
import { CreateComponent } from './components/create/create.component';
import { ListComponent } from './components/list/list.component';
import { UpdateComponent } from './components/update/update.component';
 
const routes: Routes = [
    { path: 'vars', component: ListComponent, canActivate: [AuthGuardService] },
    { path: 'vars/create', component: CreateComponent, canActivate: [AuthGuardService] },
    { path: 'vars/update', component: UpdateComponent, canActivate: [AuthGuardService] },    
];
 
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VarsFileRoutingModule {}