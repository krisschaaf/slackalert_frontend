import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { SlackDTO } from 'src/app/model/config';
import { SlackService } from 'src/app/services/config/slack.service';
import { NotificationService } from 'src/app/services/notification.service';
import { UserService } from 'src/app/services/user.service';
import { TestingUtils } from 'src/utils/testingUtils';

import { SlackSetupComponent } from './slack-setup.component';

const TESTING_EMAIL = 'max.mockermann@test.de';
const TESTING_CHANNEL_NAME = 'testingName';
const TESTING_BASE_URL = 'https://www.testing.de/';
const TESTING_TOKEN = 'daofvöaaöofbhöoae';

const TESTING_FORM_DATA = {
  emailFormControl: TESTING_EMAIL,
  channelNameFormControl: TESTING_CHANNEL_NAME,
  tokenFormControl: TESTING_TOKEN,
  urlFormControl: TESTING_BASE_URL,
  urlCheckboxFormControl: false,
}

const EMTPY_CONFIG: SlackDTO = {
  userId: '',
  email: '',
  channelName: '',
  baseUrl: '',
  token: '',
}

describe('SlackSetupComponent', () => {
  let component: SlackSetupComponent;
  let fixture: ComponentFixture<SlackSetupComponent>;
  const sendSlackFormOnPOSTSpy = jasmine.createSpy('sendSlackFormOnPOST');
  const notifyUserSpy = jasmine.createSpy('notifyUser');
  const navigateSpy = jasmine.createSpy('navigate');
  const getBaseUrlSpy = jasmine.createSpy('getBaseUrl');
  const getEmailFromIdTokenSpy = jasmine.createSpy('getEmailFromIdToken');
  const getConfigSpy = jasmine.createSpy('getConfig');

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatSnackBarModule, HttpClientTestingModule],
      declarations: [SlackSetupComponent],
      providers: [
        {
          provide: SlackService,
          useClass: class {
            sendSlackFormOnPOST = sendSlackFormOnPOSTSpy;
            getBaseUrl = getBaseUrlSpy;
            getConfig = getConfigSpy;
          },
        },
        {
          provide: NotificationService,
          useClass: class {
            notifyUser = notifyUserSpy;
          }
        },
        {
          provide: Router,
          useClass: class {
            navigate = navigateSpy;
          }
        },
        {
          provide: UserService,
          useClass: class {
            getEmailFromIdToken = getEmailFromIdTokenSpy;
          }
        }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(SlackSetupComponent);
    component = fixture.componentInstance;
    getConfigSpy.and.returnValue(of(EMTPY_CONFIG));
    getBaseUrlSpy.and.returnValue(of(TESTING_BASE_URL));
    getEmailFromIdTokenSpy.and.returnValue(1);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a valid form', () => {
    component.sendSlackForm.setValue(TESTING_FORM_DATA);
    expect(component.sendSlackForm.valid).toBeTruthy();
  });

  it('should have invalid form on invalid email', () => {
    component.sendSlackForm.setValue({
      emailFormControl: 'test',
      channelNameFormControl: TESTING_CHANNEL_NAME,
      tokenFormControl: TESTING_TOKEN,
      urlFormControl: TESTING_BASE_URL,
      urlCheckboxFormControl: false,
    });
    expect(component.sendSlackForm.valid).toBeFalsy();
  });

  it('should get and fill out url field on init', () => {
    expect(getBaseUrlSpy).toHaveBeenCalled();
    expect(component.urlFormControl.value).toEqual(TESTING_BASE_URL);
  });

  //html

  it('should disable submit button on invalid form', () => {
    component.sendSlackForm.setValue({
      emailFormControl: '',
      channelNameFormControl: '',
      tokenFormControl: '',
      urlCheckboxFormControl: false,
      urlFormControl: TESTING_BASE_URL,
    });
    fixture.detectChanges();

    const submitButton: HTMLButtonElement = TestingUtils.findComponent(fixture, '[type="submit"]').nativeElement;
    expect(submitButton.disabled).toBeTruthy();
  });

  it('should enable submit button on valid form', () => {
    component.sendSlackForm.setValue(TESTING_FORM_DATA);
    fixture.detectChanges();

    const submitButton: HTMLButtonElement = TestingUtils.findComponent(fixture, '[type="submit"]').nativeElement;
    expect(submitButton.disabled).toBeFalsy();
  });

  //onSubmit

  it('should call userService on submit', () => {
    sendSlackFormOnPOSTSpy.and.returnValue(of({}));
    component.sendSlackForm.setValue(TESTING_FORM_DATA);
    component.onSendSlackFormHandler();

    expect(sendSlackFormOnPOSTSpy).toHaveBeenCalledWith({
      userId: 1,
      email: TESTING_EMAIL.trim(),
      channelName: TESTING_CHANNEL_NAME,
      token: TESTING_TOKEN,
      baseUrl: '',
    });
  });

  // notify user

  it('should notify user when registration succeeded', () => {
    sendSlackFormOnPOSTSpy.and.returnValue(of({}));
    component.onSendSlackFormHandler();
    expect(notifyUserSpy).toHaveBeenCalledWith('Success!');
  });

  // router

  it('should navigate', () => {
    sendSlackFormOnPOSTSpy.and.returnValue(of({}));
    notifyUserSpy.and.returnValue(of({}));
    component.onSendSlackFormHandler();

    expect(navigateSpy).toHaveBeenCalledWith(['/config/alerting-setup']);
  });
});
