import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { HomeRoutingModule } from './home.routing.module';
import { HomeComponent } from './components';
import { AuthService, AuthGuardService } from 'src/app/core';

@NgModule({
  declarations: [HomeComponent],
  providers: [AuthService, AuthGuardService],
  imports: [ 
    SharedModule,
    HomeRoutingModule,
  ]
})
export class HomeModule { }
