import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService, AuthService, Issuer } from 'src/app/core';
import { VarsFileService } from '../../services/varsFile.service';


@Component({
  selector: 'app-vars-list',
  templateUrl: './list.component.html',
  styleUrls: ['../../varsFile.module.scss']
})
export class ListComponent implements OnInit {
  issuers: Issuer[] = [{ 
              id: "",
              commonName: "N/A",
              country: "N/A",
              province: "N/A",
              city: "N/A",
              organization: "N/A",
              organizationalUnit: "N/A",
              email: "N/A"
            },];

  displayedColumns: string[] = ['common-name', 'country', 'province', 'city', 'organization', 'organizational-unit', 'email'];

  constructor(private authService: AuthService, 
    private messageService: MessageService,
    private varsFileService: VarsFileService,
    private router: Router) { }
 
  ngOnInit(): void {
    this.getIssuers();
  }

  getIssuers() : void {
    this.varsFileService.getIssuers(this.authService.getAuthString(), this.authService.getUserId()).subscribe(
      res => this.issuers = res.issuers
    );
  }

  onClick(id: string) {
    if (id) {
      this.varsFileService.varsFileIdSelected.next(id);
      this.router.navigateByUrl('vars/update');
    }
  }
}
