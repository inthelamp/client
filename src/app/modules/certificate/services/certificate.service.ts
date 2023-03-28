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


    // Getting a vars settings file 
    getCA(id: string, authString: string, userId: string): Observable<any> {
      return this.httpClient.get<any>(`${environment.APP_SERVER_BASE_URL}/certificates/authority`, { headers: new HttpHeaders ({ authorization: authString, userid: userId, id: id })}).pipe(
        tap(async _ => {
          console.log('Sucessfully get a vars settings file!');
          this.varsFileIdSelected.next("");
        }),
        catchError(this.messageService.handleErrorMessage('Getting a vars settings file'))
      );
    }
  
    // Saving review content into server database
    createCA(ca: Certificate, authString: string, userId: string): Observable<any> {
      return this.httpClient.post<any>(`${environment.APP_SERVER_BASE_URL}/certificates/createCA`, ca, { headers: new HttpHeaders ({ authorization: authString, userid: userId })}).pipe(
        tap(async _ => {
          console.log("Creating vars settings file is processed!"); 
        }),
        catchError(this.messageService.handleErrorMessage('Creating vars file')),
      );
    }
  
    // Updating a vars settings file
    updateCA(ca: Certificate, authString: string, userId: string): Observable<any> {
      return this.httpClient.post<any>(`${environment.APP_SERVER_BASE_URL}/certificates/updateCA`, ca, { headers: new HttpHeaders ({ authorization: authString, userid: userId })}).pipe(
        tap(async _ => {
          console.log("Updating vars settings file is processed!");    
        }),
        catchError(this.messageService.handleErrorMessage('Updating vars settings file')),
      );
    }
  
  
    // Deleting a vars settings file
    deleteCA(id: string, commonName: string, authString: string, userId: string) : Observable<any> {
      return this.httpClient.delete<any>(`${environment.APP_SERVER_BASE_URL}/certificates/deleteCA`, { headers: new HttpHeaders ({ authorization: authString, userid: userId, id: id, common_name: commonName })}).pipe(
        tap(async _ => {
          console.log("Deleting vars settings file is processed!");
        }),
        catchError(this.messageService.handleErrorMessage('Deleting vars settings file'))
      );
    }
}
