import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService, IssuerService, Issuer } from 'src/app/core';

@Component({
  selector: 'app-vars-list',
  templateUrl: './list.component.html',
  styleUrls: ['../../vars-file.module.scss']
})
export class ListComponent implements OnInit {
  issuers!: Issuer[];

  displayedColumns: string[] = ['common-name', 'country', 'province', 'city', 'organization', 'organizational-unit', 'email'];

  constructor(private authService: AuthService, 
    private issuerService: IssuerService,
    private router: Router) { }
 
  ngOnInit(): void {
    this.getIssuers();
  }

  getIssuers() : void {
    this.issuerService.getIssuers(this.authService.getAuthString(), this.authService.getUserId()).subscribe(
      res => this.issuers = res.issuers
    );
  }

  onClick(id: string) {
    if (id) {
      this.issuerService.selectedId.next(id);
      this.router.navigateByUrl('vars/update');
    }
  }
}
