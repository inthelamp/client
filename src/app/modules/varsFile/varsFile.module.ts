import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { AuthService, LocalStorageService } from 'src/app/core';
import { VarsFileRoutingModule } from './varsFile.routing.module';
import { CreateComponent  } from './components/create/create.component';
import { ListComponent  } from './components/list/list.component';
import { UpdateComponent } from './components/update/update.component';
import { VarsFileService } from './services/varsFile.service';

@NgModule({
  declarations: [CreateComponent, ListComponent, UpdateComponent],
  providers: [AuthService, LocalStorageService, VarsFileService],
  imports: [ 
    VarsFileRoutingModule,
    SharedModule,
  ]
})
export class VarsFileModule { }
