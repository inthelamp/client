import { Component, OnInit, ViewChildren, QueryList } from '@angular/core';
import { Router } from '@angular/router';
import { animate, state, style, transition, trigger } from '@angular/animations'; 
import { MatTable } from '@angular/material/table';
import { AuthService, IssuerService, Issuer, CertificateService, Certificate, Categories, Statuses } from 'src/app/core';

@Component({
  selector: 'app-vars-list',
  templateUrl: './list.component.html',
  styleUrls: ['../../vars-files.module.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0px' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ], 
})
export class ListComponent implements OnInit {
  @ViewChildren('innerTables') innerTables!: QueryList<MatTable<Certificate>>;

  certificates: Certificate[] | null = null;
  issuers!: Issuer[];
  isSeverServiceRequested: boolean = false;
  isServerServiceCompleted: boolean = false;
  isRowExpanded: boolean = false;

  displayedColumns: string[] = ['common-name', 'country', 'province', 'city', 'organization', 'organizational-unit', 
                                'email', 'init', 'CA', 'DH', 'server', 'TA', 'client'];
  innerDisplayedColumns: string[] = ['commonName', 'category'];

  constructor(private authService: AuthService, 
    private issuerService: IssuerService,
    private certificateService: CertificateService,
    private router: Router) { }

  ngOnInit(): void {
    this.getIssuers();
  }

  isWaitingForServer() {
    return this.isSeverServiceRequested && !this.isServerServiceCompleted;
  }

  getIssuers() : void {
    this.issuerService.getIssuers(this.authService.getAuthString(), this.authService.getUserId()).subscribe(
      res => this.issuers = res.issuers
    );
  }

  getCertificates(id: string) : void {
    this.certificateService.getCertificates(id, this.authService.getAuthString(), this.authService.getUserId()).subscribe(
      res => this.certificates = res.certificates
    );
  }

  toggleListCertificates(issuer: Issuer) {
    if ((issuer.status == Statuses.Generated_Server || issuer.status == Statuses.Generated_TA || issuer.status == Statuses.Generated_Client) && this.certificates != null) {
      this.certificates = null;
      this.isRowExpanded = false;
    } else if ((issuer.status == Statuses.Generated_Server || issuer.status == Statuses.Generated_TA || issuer.status == Statuses.Generated_Client) && this.certificates == null) {
      this.getCertificates(issuer.id);
      this.isRowExpanded = true;
    }
  }

  onListCertificates(id: string) {

  }

  OnInitPKI(id: string, commonName: string) {
    this.certificateService.initPKI(id, commonName, this.authService.getAuthString(), this.authService.getUserId()).subscribe({
      next: (res) => {

      },
      error: (e) => {
        console.log(e);
      }, 
      complete: () => {
        console.log(`Init-PKI for ${id} is successfully performed.`)
        this.getIssuers();
      }   
    });
  }

  onGenerateCA(id: string, commonName: string) {
    this.isSeverServiceRequested = true;
    this.isServerServiceCompleted = false;
    this.certificateService.generateCA(id, commonName, this.authService.getAuthString(), this.authService.getUserId()).subscribe({
      next: (res) => {
        this.isServerServiceCompleted = true;
      },
      error: (e) => {
        console.log(e);
      }, 
      complete: () => {
        this.isSeverServiceRequested = false;
        this.isServerServiceCompleted = false;
        console.log(`Generating CA for ${commonName} is successfully performed.`)
        this.getIssuers();
      }   
    });
  }

  onGenerateDH(id: string, commonName: string) {
    this.isSeverServiceRequested = true;
    this.isServerServiceCompleted = false;
    this.certificateService.generateDH(id, commonName, this.authService.getAuthString(), this.authService.getUserId()).subscribe({
      next: (res) => {
        this.isServerServiceCompleted = true;
      },
      error: (e) => {
        console.log(e);
      }, 
      complete: () => {
        this.isSeverServiceRequested = false;
        this.isServerServiceCompleted = false;
        console.log(`Generating DH for ${commonName} is successfully performed.`)
        this.getIssuers();
      }   
    });
  }

  onGenerateTA(id: string, commonName: string) {
    this.certificateService.generateTA(id, commonName, this.authService.getAuthString(), this.authService.getUserId()).subscribe({
      next: (res) => {

      },
      error: (e) => {
        console.log(e);
      }, 
      complete: () => {
        console.log(`Generating server for ${commonName} is successfully performed.`)
        this.getIssuers();
      }   
    });
  }

  onGenerateServer(id: string, commonName: string) {
    if (id) {
      this.certificateService.varsFileIdSelected.next(id);
      this.certificateService.commonNameSelected.next(commonName);
      this.certificateService.certificateCategory.next(Categories.Server);
      this.router.navigateByUrl('certificates/create');
    }
  }

  onGenerateClient(id: string, commonName: string) {
    if (id) {
      this.certificateService.varsFileIdSelected.next(id);
      this.certificateService.commonNameSelected.next(commonName);
      this.certificateService.certificateCategory.next(Categories.Client);
      this.router.navigateByUrl('certificates/create');
    }
  }

  onUpdate(id: string) {
    if (id) {
      this.issuerService.varsFileIdSelected.next(id);
      this.router.navigateByUrl('vars/update');
    }
  }
}
