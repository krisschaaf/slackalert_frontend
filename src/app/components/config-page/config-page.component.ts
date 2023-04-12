import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ConfigFormDTO } from 'src/app/model/config';
import { AlertingService } from 'src/app/services/alerting.service';
import { ConfigService } from 'src/app/services/config/config.service';
import { NotificationService } from 'src/app/services/notification.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-config-page',
  templateUrl: './config-page.component.html',
  styleUrls: ['./config-page.component.scss']
})
export class ConfigPageComponent implements OnInit {
  configForm!: FormGroup;
  contentLoaded = false;
  alertingCheckbox1Checked!: boolean;
  alertingCheckbox2Checked!: boolean;
  alertingCheckbox3Checked!: boolean;
  alertingCheckbox4Checked!: boolean;

  constructor(private configService: ConfigService, private alertingService: AlertingService, private notificationService: NotificationService, private userService: UserService) { }

  ngOnInit(): void {
    this.userService.injectTokenService();
    this.configService.getConfigForm().subscribe((configFormDTO: ConfigFormDTO) => {
      this.configForm = new FormGroup({
        gitlabEmailFormControl: new FormControl({ value: configFormDTO.gitlabEmail, disabled: true }),
        gitlabProjectNameFormControl: new FormControl({ value: configFormDTO.gitlabProjectName, disabled: true }),
        gitlabProjectIDFormControl: new FormControl({ value: configFormDTO.gitlabProjectID, disabled: true }),
        gitlabUrlFormControl: new FormControl({ value: configFormDTO.gitlabBaseURL, disabled: true }),
        gitlabTokenFormControl: new FormControl({ value: configFormDTO.gitlabToken, disabled: true }),
        slackEmailFormControl: new FormControl({ value: configFormDTO.slackEmail, disabled: true }),
        slackChannelNameFormControl: new FormControl({ value: configFormDTO.slackChannelName, disabled: true }),
        slackBaseUrlFormControl: new FormControl({ value: configFormDTO.slackBaseUrl, disabled: true }),
        slackTokenFormControl: new FormControl({ value: configFormDTO.slackToken, disabled: true }),
        alertingCheckbox1: new FormControl(),
        alertingCheckbox2: new FormControl(),
        alertingCheckbox3: new FormControl(),
        alertingCheckbox4: new FormControl(),
      });
      this.alertingCheckbox1Checked = configFormDTO.alertingCheckbox1;
      this.alertingCheckbox2Checked = configFormDTO.alertingCheckbox2;
      this.alertingCheckbox3Checked = configFormDTO.alertingCheckbox3;
      this.alertingCheckbox4Checked = configFormDTO.alertingCheckbox4;
      this.contentLoaded = true;
    });
  }

  get gitlabEmailFormControl() {
    return this.configForm.get('gitlabEmailFormControl') as FormControl;
  }
  get gitlabProjectNameFormControl() {
    return this.configForm.get('gitlabProjectNameFormControl') as FormControl;
  }
  get gitlabProjectIDFormControl() {
    return this.configForm.get('gitlabProjectIDFormControl') as FormControl;
  }
  get gitlabUrlFormControl() {
    return this.configForm.get('gitlabUrlFormControl') as FormControl;
  }
  get gitlabTokenFormControl() {
    return this.configForm.get('gitlabTokenFormControl') as FormControl;
  }
  get slackEmailFormControl() {
    return this.configForm.get('slackEmailFormControl') as FormControl;
  }
  get slackUrlFormControl() {
    return this.configForm.get('slackUrlFormControl') as FormControl;
  }
  get slackTokenFormControl() {
    return this.configForm.get('slackTokenFormControl') as FormControl;
  }
  get alertingCheckbox1() {
    return this.configForm.get('alertingCheckbox1') as FormControl;
  }
  get alertingCheckbox2() {
    return this.configForm.get('alertingCheckbox2') as FormControl;
  }
  get alertingCheckbox3() {
    return this.configForm.get('alertingCheckbox3') as FormControl;
  }
  get alertingCheckbox4() {
    return this.configForm.get('alertingCheckbox4') as FormControl;
  }

  alert() {
    this.alertingService.postAlert().subscribe({
      error: (response) => {
        response.error.message
          ? this.notificationService.notifyUser(response.error.message)
          : this.notificationService.notifyUser('Alerting failed, please try again.');
      },
      next: (response) => {
        this.notificationService.notifyUser('Alerting succeeded.');
      }
    });
  }
}
