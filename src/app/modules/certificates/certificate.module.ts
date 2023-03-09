import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { AuthService, LocalStorageService } from 'src/app/core';
import { CertificateRoutingModule } from './certificate.routing.module';
import { CaComponent  } from './components/ca/ca.component';


@NgModule({
  declarations: [CaComponent],
  providers: [AuthService, LocalStorageService],
  imports: [ 
    CertificateRoutingModule,
    SharedModule,
  ]
})
export class CertificateModule { }
