import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, catchError, Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { MessageService } from 'src/app/core/services/message/message.service';

@Injectable({
  providedIn: 'root'
})
export class IssuerService {
  selectedId = new BehaviorSubject("");

  constructor(private httpClient: HttpClient,
    private messageService: MessageService) { }

  getIssuers(authString: string, userId: string): Observable<any> {
    return this.httpClient.get<any>(`${environment.APP_SERVER_BASE_URL}/issuers/issuers`, { headers: new HttpHeaders ({ authorization: authString, userid: userId })}).pipe(
      tap(async _ => {
        console.log('Sucessfully retrieving issuers from vars settings!');
      }),
      catchError(this.messageService.handleErrorMessage('Getting a list of issuers from vars settings'))
    );
  }
}