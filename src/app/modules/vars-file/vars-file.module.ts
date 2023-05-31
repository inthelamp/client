import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { AuthService, AuthGuardService, LocalStorageService, IssuerService, CertificateService } from 'src/app/core';
import { VarsFileRoutingModule } from './vars-file.routing.module';
import { CreateComponent  } from './components/create/create.component';
import { ListComponent  } from './components/list/list.component';
import { UpdateComponent } from './components/update/update.component';
import { VarsFileService } from './services/vars-file.service';

@NgModule({
  declarations: [CreateComponent, ListComponent, UpdateComponent],
  providers: [AuthService, AuthGuardService, LocalStorageService, VarsFileService, IssuerService, CertificateService],
  imports: [ 
    VarsFileRoutingModule,
    SharedModule,
  ]
})
export class VarsFileModule { }
