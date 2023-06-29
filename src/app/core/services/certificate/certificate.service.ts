import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, catchError, Observable, tap } from 'rxjs';
import { Certificate } from 'src/app/core/models'
import { environment } from 'src/environments/environment';
import { MessageService, Categories } from 'src/app/core';

@Injectable({
  providedIn: 'root'
})
export class CertificateService {

  varsFileIdSelected = new BehaviorSubject("");
  commonNameSelected = new BehaviorSubject("");
  certificateCategory = new BehaviorSubject(Categories.Client);

  constructor(private httpClient: HttpClient,
    private messageService: MessageService) { }

    getCertificates(id: string, authString: string, userId: string): Observable<any> {
      return this.httpClient.get<any>(`${environment.APP_SERVER_BASE_URL}/certificates/certificates`, { headers: new HttpHeaders ({ authorization: authString, userid: userId, id: id })}).pipe(
        tap(async _ => {
          console.log('Sucessfully retrieving certificates for the issuer!');
        }),
        catchError(this.messageService.handleErrorMessage('Getting a list of certificates for the issuer'))
      );
    }

    initPKI(id: string, commonName:string, authString: string, userId: string) : Observable<any> {
      return this.httpClient.head<any>(`${environment.APP_SERVER_BASE_URL}/certificates/initPKI`, { headers: new HttpHeaders ({ authorization: authString, userid: userId, id: id, common_name: commonName })}).pipe(
        tap(async _ => {
          console.log("INIT-PKI is processed!");
        }),
        catchError(this.messageService.handleErrorMessage('INIT-PKI')),
      );
    }

    generateCA(id: string, commonName:string, authString: string, userId: string) : Observable<any> {
      return this.httpClient.head<any>(`${environment.APP_SERVER_BASE_URL}/certificates/generateCA`, { headers: new HttpHeaders ({ authorization: authString, userid: userId, id: id, common_name: commonName })}).pipe(
        tap(async _ => {
          console.log("Generating CA is processed!");
        }),
        catchError(this.messageService.handleErrorMessage('Generating CA')),
      );
    }

    generateDH(id: string, commonName:string, authString: string, userId: string) : Observable<any> {
      return this.httpClient.head<any>(`${environment.APP_SERVER_BASE_URL}/certificates/generateDH`, { headers: new HttpHeaders ({ authorization: authString, userid: userId, id: id, common_name: commonName })}).pipe(
        tap(async _ => {
          console.log("Generating DH is processed!");
        }),
        catchError(this.messageService.handleErrorMessage('Generating DH')),
      );
    }

    generateTA(id: string, commonName:string, authString: string, userId: string) : Observable<any> {
      return this.httpClient.head<any>(`${environment.APP_SERVER_BASE_URL}/certificates/generateTA`, { headers: new HttpHeaders ({ authorization: authString, userid: userId, id: id, common_name: commonName })}).pipe(
        tap(async _ => {
          console.log("Generating TA is processed!");
        }),
        catchError(this.messageService.handleErrorMessage('Generating TA')),
      );
    }

    generateCertificate(name: string, authString: string, userId: string) : Observable<any> {
      return this.httpClient.head<any>(`${environment.APP_SERVER_BASE_URL}/certificates/generateCertificate`, 
                                        { headers: new HttpHeaders ({ authorization: authString, userid: userId, id: this.varsFileIdSelected.value, 
                                          common_name: this.commonNameSelected.value, certificate_name: name, certificate_category : this.certificateCategory.value })}).pipe(
        tap(async _ => {
          console.log("Generating client is processed!");
        }),
        catchError(this.messageService.handleErrorMessage('Generating client')),
      );
    }
}