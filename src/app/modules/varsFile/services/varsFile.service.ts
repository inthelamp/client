import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, catchError, Observable, tap } from 'rxjs';
import { VarsFile } from 'src/app/core/models'
import { environment, httpOptions } from 'src/environments/environment';
import { MessageService } from 'src/app/core/services/message/message.service';

@Injectable({
  providedIn: 'root'
})
export class VarsFileService {

  varsFileIdSelected = new BehaviorSubject("");

  constructor(private httpClient: HttpClient,
              private messageService: MessageService) { }

  getIssuers(authString: string, userId: string): Observable<any> {
    return this.httpClient.get<any>(`${environment.APP_SERVER_BASE_URL}/varsFiles/issuers`, { headers: new HttpHeaders ({ authorization: authString, userid: userId })}).pipe(
      tap(async _ => {
        console.log('Sucessfully got issuers from vars settings!');
      }),
      catchError(this.messageService.handleErrorMessage('Getting a list of issuers from vars settings'))
    );
  }

  // Getting a vars settings file 
  getVarsFile(id: string, authString: string, userId: string): Observable<any> {
    return this.httpClient.get<any>(`${environment.APP_SERVER_BASE_URL}/varsFiles/varsFile`, { headers: new HttpHeaders ({ authorization: authString, userid: userId, id: id })}).pipe(
      tap(async _ => {
        console.log('Sucessfully get a vars settings file!');
        this.varsFileIdSelected.next("");
      }),
      catchError(this.messageService.handleErrorMessage('Getting a vars settings file'))
    );
  }

  // Saving review content into server database
  createVarsFile(varsFile: VarsFile, authString: string, userId: string): Observable<any> {
    return this.httpClient.post<any>(`${environment.APP_SERVER_BASE_URL}/varsFiles/create`, varsFile, { headers: new HttpHeaders ({ authorization: authString, userid: userId })}).pipe(
      tap(async _ => {
        console.log("Creating vars settings file is processed!"); 
      }),
      catchError(this.messageService.handleErrorMessage('Creating vars file')),
    );
  }

  // Updating a vars settings file
  updateVarsFile(varsFile: VarsFile, authString: string, userId: string): Observable<any> {
    return this.httpClient.post<any>(`${environment.APP_SERVER_BASE_URL}/varsFiles/update`, varsFile, { headers: new HttpHeaders ({ authorization: authString, userid: userId })}).pipe(
      tap(async _ => {
        console.log("Updating vars settings file is processed!");    
      }),
      catchError(this.messageService.handleErrorMessage('Updating vars settings file')),
    );
  }


  // Deleting a vars settings file
  deleteVarsFile(id: string, commonName: string, authString: string, userId: string) : Observable<any> {
    return this.httpClient.delete<any>(`${environment.APP_SERVER_BASE_URL}/varsFiles/delete`, { headers: new HttpHeaders ({ authorization: authString, userid: userId, id: id, common_name: commonName })}).pipe(
      tap(async _ => {
        console.log("Deleting vars settings file is processed!");
      }),
      catchError(this.messageService.handleErrorMessage('Deleting vars settings file'))
    );
  }

  // Updating review, "Content-Type": "multipart/form-data" is set automatically by Angular
  updateCa(formData: FormData, authString: string, userId: string) : Observable<any> {
    return this.httpClient.post<any>(`${environment.APP_SERVER_BASE_URL}/certificates/update`, formData, { headers: new HttpHeaders ({ authorization: authString, userid: userId })}).pipe(
      tap(async _ => {
        console.log("Updating is processed!");
      //  this.reviewSubjectService.setMyReviewSelected(true);
      //  this.reviewSubjectService.reviewListChanged.next(true);
      }),
      catchError(this.messageService.handleErrorMessage('Updating review'))
    );
  }

  // Deleting review
  deleteCa(id: string, authString: string, userId: string) : Observable<any> {
    return this.httpClient.delete<any>(`${environment.APP_SERVER_BASE_URL}/certificates/delete`, { headers: new HttpHeaders ({ authorization: authString, userid: userId, id: id })}).pipe(
      tap(async _ => {
        console.log("Deleting is processed!");
    //    this.reviewSubjectService.myReviewSelected.next(false);
    //    this.reviewSubjectService.otherReviewSelected.next(false);
    //    this.reviewSubjectService.reviewListChanged.next(true);
      }),
      catchError(this.messageService.handleErrorMessage('Deleting a certificate authority'))
    );
  }

  // Getting review
  getCa(id: string): Observable<any> {
    return this.httpClient.get<any>(`${environment.APP_SERVER_BASE_URL}/certificates/certificates/${id}`).pipe(
      tap(async _ => {
        console.log('Sucessfully get a review!');
      }),
      catchError(this.messageService.handleErrorMessage('Getting a certificate authority'))
    );
  }
}
