import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { AuthService, AuthGuardService, LocalStorageService, IssuerService, CertificateService } from 'src/app/core';
import { CertificatesRoutingModule } from './certificates.routing.module';
import { CreateComponent  } from './components/create/create.component';
import { ListComponent  } from './components/list/list.component';

@NgModule({
  declarations: [CreateComponent, ListComponent],
  providers: [AuthService, AuthGuardService, LocalStorageService, CertificateService, IssuerService, CertificateService],
  imports: [ 
    CertificatesRoutingModule,
    SharedModule,
  ]
})
export class CertificatesModule { }
