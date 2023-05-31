import { Component, OnInit, ViewChildren, QueryList } from '@angular/core';
import { Router } from '@angular/router';
import { animate, state, style, transition, trigger } from '@angular/animations';
// import { MatTable } from '@angular/material/table';
import { AuthService, IssuerService, Issuer, CertificateService, Client } from 'src/app/core';

@Component({
  selector: 'app-vars-list',
  templateUrl: './list.component.html',
  styleUrls: ['../../vars-file.module.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ], 
})
export class ListComponent implements OnInit {
  // @ViewChildren('innerTables') innerTables!: QueryList<MatTable<Client>>;

  clients: Client[] | undefined;
  issuers!: Issuer[];
  isSeverServiceRequested: boolean = false;
  isServerServiceCompleted: boolean = false;

  displayedColumns: string[] = ['common-name', 'country', 'province', 'city', 'organization', 'organizational-unit', 
                                'email', 'init', 'CA', 'DH', 'server', 'TA', 'client'];
  innerDisplayedColumns: string[] = [ 'Clients'];
  expandedElement: Issuer | undefined;

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

  toggleRow(issuer: Issuer) {
    // issuer.addresses && (issuer.addresses as MatTableDataSource<Issuer>).data.length ? (this.expandedElement = this.expandedElement === issuer ? null : issuer) : null;
    // this.cd.detectChanges();
    // this.innerTables.forEach((table, index) => (table.dataSource as MatTableDataSource<Address>).sort = this.innerSort.toArray()[index]);
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
        console.log(`Generating CA for ${id} is successfully performed.`)
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
        console.log(`Generating DH for ${id} is successfully performed.`)
        this.getIssuers();
      }   
    });
  }

  onGenerateServerCertificate(id: string, commonName: string) {
    this.certificateService.generateServer(id, commonName, this.authService.getAuthString(), this.authService.getUserId()).subscribe({
      next: (res) => {

      },
      error: (e) => {
        console.log(e);
      }, 
      complete: () => {
        console.log(`Generating server for ${id} is successfully performed.`)
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
        console.log(`Generating server for ${id} is successfully performed.`)
        this.getIssuers();
      }   
    });
  }

  onGenerateClientCertificates(id: string, commonName: string) {
    // this.certificateService.generateClient(id, commonName, this.authService.getAuthString(), this.authService.getUserId()).subscribe({
    //   next: (res) => {

    //   },
    //   error: (e) => {
    //     console.log(e);
    //   }, 
    //   complete: () => {
    //     console.log(`Generating client for ${id} is successfully performed.`)
    //     this.getIssuers();
    //   }   
    // });
  }

  onClick(id: string) {
    if (id) {
      this.issuerService.selectedId.next(id);
      this.router.navigateByUrl('vars/update');
    }
  }
}
