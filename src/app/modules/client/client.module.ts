import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { AuthService, AuthGuardService, LocalStorageService, IssuerService, CertificateService } from 'src/app/core';
import { CertificateRoutingModule } from './client.routing.module';
import { CreateComponent  } from './components/create/create.component';
import { ListComponent  } from './components/list/list.component';

@NgModule({
  declarations: [CreateComponent, ListComponent],
  providers: [AuthService, AuthGuardService, LocalStorageService, CertificateService, IssuerService, CertificateService],
  imports: [ 
    CertificateRoutingModule,
    SharedModule,
  ]
})
export class ClientModule { }
