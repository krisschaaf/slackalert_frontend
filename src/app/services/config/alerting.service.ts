import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AlertingDTO } from 'src/app/model/config';
import { UserService } from '../user.service';

@Injectable({
  providedIn: 'root'
})
export class AlertingService {
  alertingURL = 'alerting-setup/'
  alertingFormPOSTURL = environment.backendBasePath + this.alertingURL + 'sendAlertingFormOnPOST';
  getConfigURL = environment.backendBasePath + this.alertingURL + 'getConfig';

  constructor(private http: HttpClient, private userService: UserService) { }

  sendAlertingFormOnPOST(alertingURL: AlertingDTO): Observable<any> {
    return this.http.post<any>(this.alertingFormPOSTURL, alertingURL);
  };

  getConfig(): Observable<AlertingDTO> {
    let queryParams = new HttpParams().append('id', this.userService.getEmailFromIdToken());
    return this.http.get<AlertingDTO>(this.getConfigURL, {params: queryParams})
  };
}
