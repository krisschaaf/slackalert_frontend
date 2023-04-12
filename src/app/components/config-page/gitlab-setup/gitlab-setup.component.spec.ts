import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { GitlabDTO } from 'src/app/model/config';
import { GitlabService } from 'src/app/services/config/gitlab.service';
import { NotificationService } from 'src/app/services/notification.service';
import { UserService } from 'src/app/services/user.service';
import { TestingUtils } from 'src/utils/testingUtils';

import { GitlabSetupComponent } from './gitlab-setup.component';

const TESTING_EMAIL = 'max.mockermann@test.de';
const TESTING_PROJECT_NAME = 'testName';
const TESTING_PROJECT_ID = '124';
const TESTING_BASE_URL = 'https://www.testing.de/';
const TESTING_TOKEN = 'daofvöaaöofbhöoae';

const TESTING_FORM_DATA = {
  emailFormControl: TESTING_EMAIL,
  projectNameFormControl: TESTING_PROJECT_NAME,
  projectIDFormControl: TESTING_PROJECT_ID,
  urlFormControl: TESTING_BASE_URL,
  tokenFormControl: TESTING_TOKEN,
}

const EMPTY_CONFIG: GitlabDTO = {
  userId: '',
  email: '',
  projectName: '',
  projectID: NaN,
  baseURL: '',
  token: '',
};

describe('GitlabSetupComponent', () => {
  let component: GitlabSetupComponent;
  let fixture: ComponentFixture<GitlabSetupComponent>;
  const sendGitlabFormOnPOSTSpy = jasmine.createSpy('sendGitlabFormOnPOST');
  const notifyUserSpy = jasmine.createSpy('notifyUser');
  const navigateSpy = jasmine.createSpy('navigate');
  const getEmailFromIdTokenSpy = jasmine.createSpy('getEmailFromIdToken');
  const getConfigSpy = jasmine.createSpy('getConfig');

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatSnackBarModule, HttpClientTestingModule],
      declarations: [GitlabSetupComponent],
      providers: [
        {
          provide: GitlabService,
          useClass: class {
            sendGitlabFormOnPOST = sendGitlabFormOnPOSTSpy;
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

    fixture = TestBed.createComponent(GitlabSetupComponent);
    component = fixture.componentInstance;
    getEmailFromIdTokenSpy.and.returnValue(1);
    getConfigSpy.and.returnValue(of(EMPTY_CONFIG));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a valid form', () => {
    component.sendGitlabForm.setValue(TESTING_FORM_DATA);
    expect(component.sendGitlabForm.valid).toBeTruthy();
  });

  it('should have invalid form on invalid email', () => {
    component.sendGitlabForm.setValue({
      emailFormControl: 'test',
      projectNameFormControl: TESTING_PROJECT_NAME,
      projectIDFormControl: TESTING_PROJECT_ID,
      urlFormControl: TESTING_BASE_URL,
      tokenFormControl: TESTING_TOKEN,
    });
    expect(component.sendGitlabForm.valid).toBeFalsy();
  });

  //html

  it('should disable submit button on invalid form', () => {
    component.sendGitlabForm.setValue({
      emailFormControl: '',
      projectNameFormControl: '',
      projectIDFormControl: '',
      urlFormControl: '',
      tokenFormControl: '',
    });
    fixture.detectChanges();

    const submitButton: HTMLButtonElement = TestingUtils.findComponent(fixture, '[type="submit"]').nativeElement;
    expect(submitButton.disabled).toBeTruthy();
  });

  it('should enable submit button on valid form', () => {
    component.sendGitlabForm.setValue(TESTING_FORM_DATA);
    fixture.detectChanges();

    const submitButton: HTMLButtonElement = TestingUtils.findComponent(fixture, '[type="submit"]').nativeElement;
    expect(submitButton.disabled).toBeFalsy();
  });

  //onSubmit

  it('should call userService on submit', () => {
    sendGitlabFormOnPOSTSpy.and.returnValue(of({}));
    component.sendGitlabForm.setValue(TESTING_FORM_DATA);
    component.onSendGitlabFormHandler();

    expect(sendGitlabFormOnPOSTSpy).toHaveBeenCalledWith({
      userId: 1,
      email: TESTING_EMAIL.trim(),
      projectName: TESTING_PROJECT_NAME,
      projectID: TESTING_PROJECT_ID.trim(),
      baseURL: TESTING_BASE_URL.trim(),
      token: TESTING_TOKEN.trim(),
    });
  });

  // notify user

  it('should notify user when registration succeeded', () => {
    sendGitlabFormOnPOSTSpy.and.returnValue(of({}));
    component.onSendGitlabFormHandler();
    expect(notifyUserSpy).toHaveBeenCalledWith('Success!');
  });

  // router

  it('should navigate', () => {
    sendGitlabFormOnPOSTSpy.and.returnValue(of({}));
    notifyUserSpy.and.returnValue(of({}));
    component.onSendGitlabFormHandler();

    expect(navigateSpy).toHaveBeenCalledWith(['/config/slack-setup']);
  });
});
