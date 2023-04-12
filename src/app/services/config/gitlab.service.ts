import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { GitlabDTO, SlackDTO } from 'src/app/model/config';
import { UserService } from '../user.service';

@Injectable({
  providedIn: 'root'
})
export class GitlabService {
  gitlabURL = 'gitlab-setup/'
  getGitlabTokenURL = environment.backendBasePath + this.gitlabURL + 'getGitlabToken';
  gitlabFormPOSTURL = environment.backendBasePath + this.gitlabURL + 'sendGitlabFormOnPOST';
  getConfigURL = environment.backendBasePath + this.gitlabURL + 'getConfig';

  constructor(private http: HttpClient, private userService: UserService) { }

  sendGitlabFormOnPOST(gitlabDTO: GitlabDTO): Observable<any> {
    return this.http.post<any>(this.gitlabFormPOSTURL, gitlabDTO);
  };

  getConfig(): Observable<GitlabDTO> {
    let queryParams = new HttpParams().append('id', this.userService.getEmailFromIdToken());
    return this.http.get<GitlabDTO>(this.getConfigURL, {params: queryParams})
  };
}
