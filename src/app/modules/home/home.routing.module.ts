import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component'; 
import { AuthGuardComponent } from 'src/app/shared/components';
import { AuthGuardService } from 'src/app/core';
 
const routes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'authguard', component: AuthGuardComponent, canActivate: [AuthGuardService] }
];
 
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule {}