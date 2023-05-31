import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, catchError, Observable, tap } from 'rxjs';
import { Certificate } from 'src/app/core/models'
import { environment } from 'src/environments/environment';
import { MessageService } from 'src/app/core/services/message/message.service';

@Injectable({
  providedIn: 'root'
})
export class CertificateService {

  private varsFileIdSelected = new BehaviorSubject("");

  constructor(private httpClient: HttpClient,
    private messageService: MessageService) { }


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

    generateServer(id: string, commonName:string, authString: string, userId: string) : Observable<any> {
      return this.httpClient.head<any>(`${environment.APP_SERVER_BASE_URL}/certificates/generateServer`, { headers: new HttpHeaders ({ authorization: authString, userid: userId, id: id, common_name: commonName })}).pipe(
        tap(async _ => {
          console.log("Generating server is processed!");
        }),
        catchError(this.messageService.handleErrorMessage('Generating server')),
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

    generateClient(name: string, id: string, commonName:string, authString: string, userId: string) : Observable<any> {
      return this.httpClient.head<any>(`${environment.APP_SERVER_BASE_URL}/certificates/generateClient`, { headers: new HttpHeaders ({ authorization: authString, userid: userId, id: id, common_name: commonName })}).pipe(
        tap(async _ => {
          console.log("Generating client is processed!");
        }),
        catchError(this.messageService.handleErrorMessage('Generating client')),
      );
    }
}
