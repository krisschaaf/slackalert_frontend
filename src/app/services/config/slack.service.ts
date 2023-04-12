import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { SlackDTO } from 'src/app/model/config';
import { UserService } from '../user.service';

@Injectable({
  providedIn: 'root'
})
export class SlackService {
  slackURL = 'slack-setup/'
  getBaseUrlURL = environment.backendBasePath + this.slackURL + 'getBaseUrl';
  slackFormPOSTURL = environment.backendBasePath + this.slackURL + 'sendSlackFormOnPOST';
  getConfigURL = environment.backendBasePath + this.slackURL + 'getConfig';

  constructor(private http: HttpClient, private userService: UserService) { }

  getBaseUrl(): Observable<string> {
    let queryParams = new HttpParams().append('id', this.userService.getEmailFromIdToken());
    return this.http.get<string>(this.getBaseUrlURL, { params: queryParams });
  };

  sendSlackFormOnPOST(slackDTO: SlackDTO): Observable<any> {
    return this.http.post<any>(this.slackFormPOSTURL, slackDTO);
  };

  getConfig(): Observable<SlackDTO> {
    let queryParams = new HttpParams().append('id', this.userService.getEmailFromIdToken());
    return this.http.get<SlackDTO>(this.getConfigURL, {params: queryParams})
  };
}
