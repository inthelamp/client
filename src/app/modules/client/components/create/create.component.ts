import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService, AuthService, CertificateService } from 'src/app/core';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['../../client.module.scss']
})
export class CreateComponent implements OnInit {
  submitted = false;

  name = new FormControl('client', {validators: [Validators.required], nonNullable: true});

  createForm: FormGroup = this.formBuilder.group({
    name : this.name,
  });

  constructor(private authService: AuthService, 
    private messageService: MessageService,
    private certificateService: CertificateService,
    private formBuilder: FormBuilder,
    private router: Router) { }

  ngOnInit(): void {
  }

  createClient(name: string, id: string, commonName: string){
    this.certificateService.generateClient(name, id, commonName, this.authService.getAuthString(), this.authService.getUserId()).subscribe({
        error: (e) => {
            console.log(e);
        },
        complete: () => {
              this.messageService.message = 'Sucessfully create vars file!';
              // Returning to Home
              this.router.navigateByUrl('home');     
        }
      });
  }
  

  onSubmit() {
    if (this.createForm.valid) {      
      this.createClient(this.name.value, '2', 's');
    }
  }
}
