import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { HomeModule } from './modules/home/home.module';
import { UserModule } from './modules/users/user.module';
import { VarsFilesModule } from './modules/vars-files/vars-files.module';
import { CertificatesModule } from './modules/certificates/certificates.module';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    CoreModule,
    SharedModule,
    HomeModule,
    UserModule,
    VarsFilesModule,
    CertificatesModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
