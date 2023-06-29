import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService, AuthService, CertificateService } from 'src/app/core';

@Component({
  selector: 'app-certs-create',
  templateUrl: './create.component.html',
  styleUrls: ['../../certificates.module.scss']
})
export class CreateComponent implements OnInit {
  submitted = false;

  name = new FormControl('client', {validators: [Validators.required], nonNullable: true});

  createForm: FormGroup = this.formBuilder.group({
    name : this.name,
  });

  constructor(private authService: AuthService, 
    private messageService: MessageService,
    public certificateService: CertificateService,
    private formBuilder: FormBuilder,
    private router: Router) { }

  ngOnInit(): void {
  }

  createCertificate(name: string){
    this.certificateService.generateCertificate(name, this.authService.getAuthString(), this.authService.getUserId()).subscribe({
      error: (e) => {
          console.log(e);
      },
      complete: () => {
            this.messageService.message = 'Sucessfully create a certificate!';
            // Returning to Home
            this.router.navigateByUrl('home');     
      }
    });
  }
  

  onSubmit() {
    if (this.createForm.valid) {      
      this.createCertificate(this.name.value);
    }
  }
}
