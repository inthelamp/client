import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { AuthService, AuthGuardService, LocalStorageService, IssuerService } from 'src/app/core';
import { CertificateRoutingModule } from './certificate.routing.module';
import { CreateCAComponent  } from './components/create-ca/create-ca.component';
import { ListCAComponent  } from './components/list-ca/list-ca.component';
import { CertificateService } from './services/certificate.service';

@NgModule({
  declarations: [CreateCAComponent, ListCAComponent],
  providers: [AuthService, AuthGuardService, LocalStorageService, CertificateService, IssuerService],
  imports: [ 
    CertificateRoutingModule,
    SharedModule,
  ]
})
export class CertificateModule { }
