import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SlackDTO } from 'src/app/model/config';
import { SlackService } from 'src/app/services/config/slack.service';
import { NotificationService } from 'src/app/services/notification.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-slack-setup',
  templateUrl: './slack-setup.component.html',
  styleUrls: ['./slack-setup.component.scss']
})
export class SlackSetupComponent implements OnInit {
  sendSlackForm!: FormGroup;
  urlCheckboxIsChecked: boolean = false;
  contentLoaded = false;

  constructor(private notificationService: NotificationService, private router: Router, private slackService: SlackService, private userService: UserService) { }

  ngOnInit(): void {
    this.slackService.getConfig().subscribe({
      error: (response) => {
        response.error.message
          ? this.notificationService.notifyUser(response.error.message)
          : this.notificationService.notifyUser('Something failed, please try again.');
      },
      next: (response) => {
        this.slackService.getBaseUrl().subscribe(tokenResponse => {
          this.sendSlackForm = new FormGroup({
            emailFormControl: new FormControl(response.email, [Validators.required, Validators.email]),
            channelNameFormControl: new FormControl(response.channelName, [Validators.required]),
            tokenFormControl: new FormControl(response.token, [Validators.required]),
            urlCheckboxFormControl: new FormControl(false),
            urlFormControl: new FormControl({ value: tokenResponse, disabled: true }, [Validators.required]),
          });
          this.contentLoaded = true;
        });
      }
    });
  }

  get emailFormControl() {
    return this.sendSlackForm.get('emailFormControl') as FormControl;
  }
  get channelNameFormControl() {
    return this.sendSlackForm.get('channelNameFormControl') as FormControl;
  }
  get tokenFormControl() {
    return this.sendSlackForm.get('tokenFormControl') as FormControl;
  }
  get urlCheckboxFormControl() {
    return this.sendSlackForm.get('urlCheckboxFormControl') as FormControl;
  }
  get urlFormControl() {
    return this.sendSlackForm.get('urlFormControl') as FormControl;
  }

  onSendSlackFormHandler() {
    const slackDTO: SlackDTO = {
      userId: this.userService.getEmailFromIdToken(),
      email: this.emailFormControl.value.trim(),
      channelName: this.channelNameFormControl.value.trim(),
      token: this.tokenFormControl.value.trim(),
      baseUrl: !this.urlFormControl.disabled ? this.urlFormControl.value.trim() : '',
    }

    this.slackService.sendSlackFormOnPOST(slackDTO).subscribe({
      error: (response) => {
        response.error.message
          ? this.notificationService.notifyUser(response.error.message)
          : this.notificationService.notifyUser('Something failed, please try again.');
      },
      complete: () => {
        this.notificationService.notifyUser('Success!');
        this.router.navigate(['/config/alerting-setup']);
      }
    });
  }

  urlCheckboxChange(isChecked: boolean) {
    this.urlCheckboxIsChecked = isChecked;
    if (isChecked) {
      this.urlFormControl.enable()
    } else {
      this.urlFormControl.disable();
      this.slackService.getBaseUrl().subscribe(tokenResponse => {
        this.urlFormControl.setValue(tokenResponse);
      })
    }
  }

  getErrorMessageEmailFormControl() {
    return this.emailFormControl.hasError('required')
      ? 'please enter a valid email adress'
      : '';
  }

  getErrorMessageChannelNameFormControl() {
    return this.channelNameFormControl.hasError('required')
      ? 'please enter your password'
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
