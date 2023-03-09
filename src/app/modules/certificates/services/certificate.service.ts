import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, tap } from  'rxjs/operators';
import { Observable } from  'rxjs';
import { CA } from 'src/app/core/models'
import { environment } from 'src/environments/environment';
import { MessageService } from 'src/app/core/services/message/message.service';

@Injectable({
  providedIn: 'root'
})
export class CertificateService {

  constructor(private httpClient: HttpClient,
              private messageService: MessageService) { }

    // Saving review content into server database
    createCA(formData: FormData, authString: string, userId: string): Observable<any> {
      return this.httpClient.post<any>(`${environment.APP_SERVER_BASE_URL}/certificateAuthorities/create`, formData, { headers: new HttpHeaders ({ authorization: authString, userid: userId })}).pipe(
        tap(async _ => {
          console.log("Creating certificate authority is processed!");    
      //    this.reviewSubjectService.setMyReviewSelected(true);
      //    this.reviewSubjectService.reviewListChanged.next(true);
        }),
        catchError(this.messageService.handleErrorMessage('Creating certificate authority')),
      );
    }
  
    // Updating review, "Content-Type": "multipart/form-data" is set automatically by Angular
    updateCa(formData: FormData, authString: string, userId: string) : Observable<any> {
      return this.httpClient.post<any>(`${environment.APP_SERVER_BASE_URL}/certificateAuthorities/update`, formData, { headers: new HttpHeaders ({ authorization: authString, userid: userId })}).pipe(
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
      return this.httpClient.delete<any>(`${environment.APP_SERVER_BASE_URL}/certificateAuthorities/delete`, { headers: new HttpHeaders ({ authorization: authString, userid: userId, id: id })}).pipe(
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
      return this.httpClient.get<any>(`${environment.APP_SERVER_BASE_URL}/certificateAuthorities/certificateAuthorities/${id}`).pipe(
        tap(async _ => {
          console.log('Sucessfully get a review!');
        }),
        catchError(this.messageService.handleErrorMessage('Getting a certificate authority'))
      );
    }
}
