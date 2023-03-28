import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService, AuthService, Countries, Digests, Algorithms, Curves, VarsFile } from 'src/app/core';
import { VarsFileService } from '../../services/vars-file.service';

@Component({
  selector: 'app-vars-create',
  templateUrl: './create.component.html',
  styleUrls: ['../../vars-file.module.scss']
})
export class CreateComponent implements OnInit {
  submitted = false;

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
  keySize = new FormControl('2048', {validators: [Validators.required], nonNullable: true});
  algorithm = new FormControl(Algorithms.ec, {validators: [Validators.required], nonNullable: true});
  curve = new FormControl(Curves.secp521r1, {validators: [Validators.required], nonNullable: true});
  digest = new FormControl(Digests.sha256, {validators: [Validators.required], nonNullable: true});
  caExpire = new FormControl('3650', {validators: [Validators.required], nonNullable: true});
  certExpire = new FormControl('1080', {validators: [Validators.required], nonNullable: true});
  certRenewDays = new FormControl('30', {validators: [Validators.required], nonNullable: true});
  crlDays = new FormControl('180', {validators: [Validators.required], nonNullable: true});
  commonName = new FormControl('inthelamp.ddns.net', {validators: [Validators.required], nonNullable: true});

  varsFileForm: FormGroup = this.formBuilder.group({
    country : this.country,
    province :  this.province,
    city : this.city,
    organization : this.organization,
    email : this.email,
    organizationalUnit : this.organizationalUnit,
    keySize: this.keySize,
    algorithm : this.algorithm,
    curve: this.curve,
    digest : this.digest,
    caExpire : this.caExpire,
    certExpire : this.certExpire,
    certRenewDays : this.certRenewDays,
    crlDays : this.crlDays,
    commonName : this.commonName,
  });

  constructor(private authService: AuthService, 
    private messageService: MessageService,
    private varsFileService: VarsFileService,
    private formBuilder: FormBuilder,
    private router: Router) { }

  ngOnInit(): void {
  }

  createVarsFile(varsFile: VarsFile){
    this.varsFileService.createVarsFile(varsFile, this.authService.getAuthString(), this.authService.getUserId()).subscribe({
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

  onList() {
    this.router.navigateByUrl('vars');     
  }

  onSubmit() {
    this.submitted = true;
    if (this.varsFileForm.valid) {

      const varsFile: VarsFile = {
        country: (<any>Countries)[this.country.value],
        province: this.province.value,
        city: this.city.value,
        organization: this.organization.value,
        email: this.email.value,
        organizationalUnit: this.organizationalUnit.value,
        keySize: Number(this.keySize.value),
        algorithm: (<any>Algorithms)[this.algorithm.value],
        curve: (<any>Curves)[this.curve.value],
        digest: (<any>Digests)[this.digest.value],
        caExpire: Number(this.caExpire.value),
        certExpire: Number(this.certExpire.value),
        certRenewDays: Number(this.certRenewDays.value),
        crlDays: Number(this.crlDays.value),
        commonName: this.commonName.value
      }
      
      this.createVarsFile(varsFile);
    }
  }
}