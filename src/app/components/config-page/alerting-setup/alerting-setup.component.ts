import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertingDTO } from 'src/app/model/config';
import { AdapterService } from 'src/app/services/adapter.service';
import { AlertingService } from 'src/app/services/config/alerting.service';
import { NotificationService } from 'src/app/services/notification.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-alerting-setup',
  templateUrl: './alerting-setup.component.html',
  styleUrls: ['./alerting-setup.component.scss']
})
export class AlertingSetupComponent implements OnInit {
  sendAlertingForm!: FormGroup;
  tokenCheckboxIsChecked1: boolean = false;
  tokenCheckboxIsChecked2: boolean = false;
  tokenCheckboxIsChecked3: boolean = false;
  tokenCheckboxIsChecked4: boolean = false;

  constructor(private notificationService: NotificationService, private router: Router, private alertingService: AlertingService, private userService: UserService, private adapterService: AdapterService) { }

  ngOnInit(): void {
    this.sendAlertingForm = new FormGroup({
      tokenCheckboxFormControl1: new FormControl(false),
      tokenCheckboxFormControl2: new FormControl(false),
      tokenCheckboxFormControl3: new FormControl(false),
      tokenCheckboxFormControl4: new FormControl(false),
    });
  };

  get tokenCheckboxFormControl1() {
    return this.sendAlertingForm.get('tokenCheckboxControl1') as FormControl;
  }
  get tokenCheckboxFormControl2() {
    return this.sendAlertingForm.get('tokenCheckboxControl2') as FormControl;
  }
  get tokenCheckboxFormControl3() {
    return this.sendAlertingForm.get('tokenCheckboxControl3') as FormControl;
  }
  get tokenCheckboxFormControl4() {
    return this.sendAlertingForm.get('tokenCheckboxControl4') as FormControl;
  }

  onSendAlertingFormHandler() {
    const alertingDTO: AlertingDTO = {
      userId: this.userService.getEmailFromIdToken(),
      postIssues: this.tokenCheckboxIsChecked1,
      postUpdatedIssues: this.tokenCheckboxIsChecked2,
      postPipelines: this.tokenCheckboxIsChecked3,
      postVariables: this.tokenCheckboxIsChecked4,
    }

    this.alertingService.sendAlertingFormOnPOST(alertingDTO).subscribe({
      error: (response) => {
        response.error.message
          ? this.notificationService.notifyUser(response.error.message)
          : this.notificationService.notifyUser('Something failed, please try again.');
      },
      complete: () => {
        this.adapterService.connectAdapter().subscribe({
          error: (response) => {
            response.error.message
              ? this.notificationService.notifyUser(response.error.message)
              : this.notificationService.notifyUser('Something failed, please try again.');
          },
          complete: () => {
            this.notificationService.notifyUser('Success!');
            this.router.navigate(['/config']);
          },
        })
      }
    });
  }

  tokenCheckboxChange1(isChecked: boolean) {
    this.tokenCheckboxIsChecked1 = isChecked;
  }
  tokenCheckboxChange2(isChecked: boolean) {
    this.tokenCheckboxIsChecked2 = isChecked;
  }
  tokenCheckboxChange3(isChecked: boolean) {
    this.tokenCheckboxIsChecked3 = isChecked;
  }
  tokenCheckboxChange4(isChecked: boolean) {
    this.tokenCheckboxIsChecked4 = isChecked;
  }
}
