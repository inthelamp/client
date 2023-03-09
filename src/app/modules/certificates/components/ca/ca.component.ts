import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService, AuthService, Countries, Digests, Algorithms, Curves } from 'src/app/core';
import { CertificateService } from '../../services/certificate.service';

@Component({
  selector: 'app-ca',
  templateUrl: './ca.component.html',
  styleUrls: ['../../certificate.module.scss']
})
export class CaComponent implements OnInit {
  countries = Countries;
  algorithms = Algorithms;
  curves = Curves;
  digests = Digests;
  
  country = new FormControl(Countries.CA, {validators: [Validators.required], nonNullable: true});
  province = new FormControl('Ontario', {validators: [Validators.required], nonNullable: true});
  city = new FormControl('London', {validators: [Validators.required], nonNullable: true});
  organization = new FormControl('In The Lamp', {validators: [Validators.required], nonNullable: true});
  email = new FormControl('admin@inthelamp.ddns.net', {validators: [Validators.required, Validators.email], nonNullable: true});
  organizationalUnit = new FormControl('Support', {validators: [Validators.required], nonNullable: true});
  algorithm = new FormControl(Algorithms.ec, {validators: [Validators.required], nonNullable: true});
  curve = new FormControl(Curves.secp521r1, {validators: [Validators.required], nonNullable: true});
  digest = new FormControl(Digests.sha256, {validators: [Validators.required], nonNullable: true});
  expire = new FormControl('3650', {validators: [Validators.required], nonNullable: true});
  renew = new FormControl('30', {validators: [Validators.required], nonNullable: true});
  days = new FormControl('180', {validators: [Validators.required], nonNullable: true});
  commonName = new FormControl('inthelamp.ddns.net', {validators: [Validators.required], nonNullable: true});
  batch = new FormControl('', {nonNullable: true});

  caForm: FormGroup = this.formBuilder.group({
    country : this.country,
    province :  this.province,
    city : this.city,
    organization : this.organization,
    email : this.email,
    organizationalUnit : this.organizationalUnit,
    algorithm : this.algorithm,
    curve: this.curve,
    digest : this.digest,
    expire : this.expire,
    renew : this.renew,
    days : this.days,
    commonName : this.commonName,
    batch : this.batch,
  });

  hide = true;
  submitted = false;

  constructor(private authService: AuthService, 
    private messageService: MessageService,
    private certificateService: CertificateService,
    private formBuilder: FormBuilder,
    private router: Router) { }

  ngOnInit(): void {
  }

  createCA(formData: FormData){
    this.certificateService.createCA(formData, this.authService.getAuthString(), this.authService.getUserId()).subscribe({
        error: (e) => {
            console.log(e);
        },
        complete: () => {
              this.messageService.message = 'Sucessfully create the certificate authority!';
              // Returning to Home
              this.router.navigateByUrl('home');     
        }
      });
  }

  onSubmit() {
    this.submitted = true;
    if (this.caForm.valid) {
      let formData = new FormData();

      const country = (<any>Countries)[this.country.value];
      formData.append('country', country);
      formData.append('province', this.province.value);
      formData.append('city', this.city.value);
      formData.append('organization', this.organization.value);
      formData.append('email', this.email.value);
      formData.append('organizationalUnit', this.organizationalUnit.value);
      const algorithm = (<any>Algorithms)[this.algorithm.value];
      formData.append('algorithm', algorithm);
      const curve = (<any>Curves)[this.curve.value];
      formData.append('curve', curve);
      const digest = (<any>Digests)[this.digest.value];
      formData.append('digest', digest);
      formData.append('expire', this.expire.value);
      formData.append('renew', this.renew.value);
      formData.append('days', this.days.value);
      formData.append('commonName', this.commonName.value);
      formData.append('batch', this.batch.value);
      this.createCA(formData);
    }
  }
}