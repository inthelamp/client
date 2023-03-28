import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, tap } from 'rxjs';
import { VarsFile } from 'src/app/core/models'
import { environment } from 'src/environments/environment';
import { MessageService } from 'src/app/core';

@Injectable({
  providedIn: 'root'
})
export class VarsFileService {

  constructor(private httpClient: HttpClient,
              private messageService: MessageService) { }

  // Getting a vars settings file 
  getVarsFile(id: string, authString: string, userId: string): Observable<any> {
    return this.httpClient.get<any>(`${environment.APP_SERVER_BASE_URL}/varsFiles/varsFile`, { headers: new HttpHeaders ({ authorization: authString, userid: userId, id: id })}).pipe(
      tap(async _ => {
        console.log('Sucessfully get a vars settings file!');
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
}
