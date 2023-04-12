import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ConfigFormDTO } from 'src/app/model/config';
import { UserService } from '../user.service';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  configURL = 'config/'
  getConfigFormURL = environment.backendBasePath + this.configURL + 'getConfigForm';
  getUserCreatedConfigURL = environment.backendBasePath + this.configURL + 'getUserCreatedConfig';
  postAlertURL = environment.backendBasePath + this.configURL + 'postAlert';

  constructor(private http: HttpClient, private userService: UserService) { }

  getConfigForm(): Observable<ConfigFormDTO> {
    let queryParams = new HttpParams().append('id', this.userService.getEmailFromIdToken());
    return this.http.get<ConfigFormDTO>(this.getConfigFormURL, {params: queryParams});
  };

  getUserCreatedConfig(): Observable<boolean> {
    let queryParams = new HttpParams().append('id', this.userService.getEmailFromIdToken());
    return this.http.get<boolean>(this.getUserCreatedConfigURL, {params: queryParams});
  }

  postAlert(): Observable<any> {
    let queryParams = new HttpParams().append('id', this.userService.getEmailFromIdToken());
    return this.http.get<any>(this.postAlertURL, {params: queryParams});
  }
}
