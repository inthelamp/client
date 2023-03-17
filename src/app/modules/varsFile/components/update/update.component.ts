import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService, AuthService, Countries, Digests, Algorithms, Curves, VarsFile } from 'src/app/core';
import { VarsFileService } from '../../services/varsFile.service';

@Component({
  selector: 'app-vars-update',
  templateUrl: './update.component.html',
  styleUrls: ['../../varsFile.module.scss']
})
export class UpdateComponent implements OnInit {
  private _subscription!: Subscription;
  private _varsFile: VarsFile | null = null;

  countries = Countries;
  algorithms = Algorithms;
  curves = Curves;
  digests = Digests;
  submitted = false;

  id = new FormControl('', {nonNullable: true});
  country = new FormControl('', {validators: [Validators.required], nonNullable: true});
  province = new FormControl('', {validators: [Validators.required], nonNullable: true});
  city = new FormControl('', {validators: [Validators.required], nonNullable: true});
  organization = new FormControl('', {validators: [Validators.required], nonNullable: true});
  email = new FormControl('', {validators: [Validators.required, Validators.email], nonNullable: true});
  organizationalUnit = new FormControl('', {validators: [Validators.required], nonNullable: true});
  keySize = new FormControl('', {validators: [Validators.required], nonNullable: true});
  algorithm = new FormControl('', {validators: [Validators.required], nonNullable: true});
  curve = new FormControl('', {validators: [Validators.required], nonNullable: true});
  digest = new FormControl('', {validators: [Validators.required], nonNullable: true});
  caExpire = new FormControl('', {validators: [Validators.required], nonNullable: true});
  certExpire = new FormControl('', {validators: [Validators.required], nonNullable: true});
  certRenewDays = new FormControl('', {validators: [Validators.required], nonNullable: true});
  crlDays = new FormControl('', {validators: [Validators.required], nonNullable: true});
  commonName = new FormControl('', {validators: [Validators.required], nonNullable: true});

  varsFileForm: FormGroup = this.formBuilder.group({
    id: this.id,
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
    this._subscription = this.varsFileService.varsFileIdSelected.subscribe( id => {
      if (id) {
        this.getVarsFile(id);
      }
    });
  }

  ngOnDestroy() {
    // Preventing memory leak when this component is destroyed
    // Otherwise, the subscribe in ngOnInit is called multiple times
    this._subscription.unsubscribe();
  }

  getVarsFile(id: string) : void {
    this.varsFileService.getVarsFile(id, this.authService.getAuthString(), this.authService.getUserId()).subscribe({
      next: (res) => {
        this._varsFile = res.varsFile;
      },
      error: (e) => {
        console.log(e);
      }, 
      complete: () => {
        if (this._varsFile) {
          this.populateForm(this._varsFile);
          console.log(`${id} is successfully retrieved.`)
        }
      }   
    });
  }  

  // Populating vars settings received into the form
  populateForm(varsFile: VarsFile) {
    this.varsFileForm.patchValue({
      id: varsFile.id,      
      country: (<any>Countries)[varsFile.country],
      province: varsFile.province,
      city: varsFile.city,
      organization: varsFile.organization,
      email: varsFile.email,
      organizationalUnit: varsFile.organizationalUnit,
      keySize: Number(varsFile.keySize),
      algorithm: (<any>Algorithms)[varsFile.algorithm],
      curve: (<any>Curves)[varsFile.curve],
      digest: (<any>Digests)[varsFile.digest],
      caExpire: Number(varsFile.caExpire),
      certExpire: Number(varsFile.certExpire),
      certRenewDays: Number(varsFile.certRenewDays),
      crlDays: Number(varsFile.crlDays),
      commonName: varsFile.commonName,      
    });
  }

  updateVarsFile(varsFile: VarsFile) : void {
    this.varsFileService.updateVarsFile(varsFile, this.authService.getAuthString(), this.authService.getUserId()).subscribe({
        error: (e) => {
            console.log(e);
        },
        complete: () => {
              this.messageService.message = 'Sucessfully create vars file!';
              // Returning to Home
              this.router.navigateByUrl('vars');     
        }
      });
  }

  onDelete() {
    this.varsFileService.deleteVarsFile(this.id.value, this.commonName.value, this.authService.getAuthString(), this.authService.getUserId()).subscribe({
      error: (e) => {
          console.log(e);
      },
      complete: () => {
            this.messageService.message = 'Sucessfully deleted the vars settings!';
            // Returning to Home
            this.router.navigateByUrl('vars');     
      }
    });
  }

  onNewVarsSettings () {

  }

  onSubmit() {
    this.submitted = true;
    if (this.varsFileForm.valid) {

      const varsFile: VarsFile = {
        id: this.id.value,
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
      
      this.updateVarsFile(varsFile);
    }
  }  
}
