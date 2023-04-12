import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AdapterService {
  adapterURL = 'adapter/'
  connectAdapterURL = environment.backendBasePath + this.adapterURL + 'connectAdapter';

  constructor(private http: HttpClient, private userService: UserService) { }

  connectAdapter(): Observable<any> {
    let params = new HttpParams().set('id', this.userService.getEmailFromIdToken());
    return this.http.get<any>(this.connectAdapterURL, { params });
  }
}
