import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateComponent } from './components/create/create.component';
import { ListComponent } from './components/list/list.component';
import { UpdateComponent } from './components/update/update.component';
 
const routes: Routes = [
    { path: 'vars', component: ListComponent },
    { path: 'vars/create', component: CreateComponent },
    { path: 'vars/update', component: UpdateComponent },    
];
 
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VarsFileRoutingModule {}