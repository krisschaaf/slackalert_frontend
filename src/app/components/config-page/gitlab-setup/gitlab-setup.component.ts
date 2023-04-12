import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GitlabDTO } from 'src/app/model/config';
import { GitlabService } from 'src/app/services/config/gitlab.service';
import { NotificationService } from 'src/app/services/notification.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-gitlab-setup',
  templateUrl: './gitlab-setup.component.html',
  styleUrls: ['./gitlab-setup.component.scss']
})
export class GitlabSetupComponent implements OnInit {
  sendGitlabForm!: FormGroup;
  contentLoaded = false;
  projectIDRegex = new RegExp('^[0-9]*$');

  constructor(private notificationService: NotificationService, private router: Router, private gitlabService: GitlabService, private userService: UserService) { }

  ngOnInit(): void {
    this.gitlabService.getConfig().subscribe({
      error: (response) => {
        response.error.message
          ? this.notificationService.notifyUser(response.error.message)
          : this.notificationService.notifyUser('Something failed, please try again.');
      },
      next: (response) => {
        this.sendGitlabForm = new FormGroup({
          emailFormControl: new FormControl(response.email, [Validators.required, Validators.email]),
          projectNameFormControl: new FormControl(response.projectName),
          projectIDFormControl: new FormControl(response.projectID === 0 ? '' : response.projectID, [Validators.required, Validators.pattern(this.projectIDRegex)]),
          urlFormControl: new FormControl(response.baseURL, [Validators.required]),
          tokenFormControl: new FormControl(response.token, [Validators.required]),
        });
        this.contentLoaded = true;
      }
    });
  }

  get emailFormControl() {
    return this.sendGitlabForm.get('emailFormControl') as FormControl;
  }
  get projectNameFormControl() {
    return this.sendGitlabForm.get('projectNameFormControl') as FormControl;
  }
  get projectIDFormControl() {
    return this.sendGitlabForm.get('projectIDFormControl') as FormControl;
  }
  get urlFormControl() {
    return this.sendGitlabForm.get('urlFormControl') as FormControl;
  }
  get tokenFormControl() {
    return this.sendGitlabForm.get('tokenFormControl') as FormControl;
  }

  onSendGitlabFormHandler() {
    const gitlabDTO: GitlabDTO = {
      userId: this.userService.getEmailFromIdToken(),
      email: this.emailFormControl.value.trim(),
      projectName: this.projectNameFormControl.value,
      projectID: this.projectIDFormControl.value,
      baseURL: this.urlFormControl.value.trim(),
      token: this.tokenFormControl.value.trim(),
    }

    this.gitlabService.sendGitlabFormOnPOST(gitlabDTO).subscribe({
      error: (response) => {
        response.error.message
          ? this.notificationService.notifyUser(response.error.message)
          : this.notificationService.notifyUser('Something failed, please try again.');
      },
      complete: () => {
        this.notificationService.notifyUser('Success!');
        this.router.navigate(['/config/slack-setup']);
      }
    });
  }

  getErrorMessageEmailFormControl() {
    return this.emailFormControl.hasError('required')
      ? 'please enter a valid email adress'
      : '';
  }

  getErrorMessageProjectIDFormControl() {
    return this.projectIDFormControl.hasError('required')
      ? 'please enter a valid id'
      : !this.projectIDFormControl.valid
        ? 'numbers only'
        : '';
  }

  getErrorMessageUrlFormControl() {
    return this.urlFormControl.hasError('required')
      ? 'please enter a URL'
      : '';
  }

  getErrorMessageTokenFormControl() {
    return this.tokenFormControl.hasError('required')
      ? 'please enter a valid token'
      : '';
  }
}
