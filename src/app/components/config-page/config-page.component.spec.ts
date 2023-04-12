import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AuthModule } from '@auth0/auth0-angular';
import { of } from 'rxjs';
import { ConfigFormDTO } from 'src/app/model/config';
import { ConfigService } from 'src/app/services/config/config.service';
import { NotificationService } from 'src/app/services/notification.service';
import { environment } from 'src/environments/environment';

import { ConfigPageComponent } from './config-page.component';

const TESTING_FORM: ConfigFormDTO = {
  gitlabEmail: 'email',
  gitlabProjectName: 'projectName',
  gitlabProjectID: '234',
  gitlabBaseURL: 'https',
  gitlabToken: 'token',
  slackEmail: 'emailslack',
  slackChannelName: 'testName',
  slackBaseUrl: 'https.slack',
  slackToken: 'tokenslack',
  alertingCheckbox1: true,
  alertingCheckbox2: true,
  alertingCheckbox3: false,
  alertingCheckbox4: true,
}

describe('ConfigPageComponent', () => {
  let component: ConfigPageComponent;
  let fixture: ComponentFixture<ConfigPageComponent>;
  const getConfigFormSpy = jasmine.createSpy('getConfigForm');
  const notifyUserSpy = jasmine.createSpy('notifyUser');

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule,
        AuthModule.forRoot({
          domain: environment.auth.domain,
          clientId: environment.auth.clientId,
        })],
      declarations: [ConfigPageComponent],
      providers: [
        {
          provide: ConfigService,
          useClass: class {
            getConfigForm = getConfigFormSpy;
          },
        },
        {
          provide: NotificationService,
          useClass: class {
            notifyUser = notifyUserSpy;
          }
        },
      ],
    })
      .compileComponents();

    fixture = TestBed.createComponent(ConfigPageComponent);
    component = fixture.componentInstance;
    getConfigFormSpy.and.returnValue(of(TESTING_FORM));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call configService on init and fill fields and checkboxes', () => {
    expect(getConfigFormSpy).toHaveBeenCalled();
  });

  it('should fill fields and checkboxes on init', () => {
    expect(component.gitlabEmailFormControl.value).toEqual('email');
    expect(component.slackEmailFormControl.value).toEqual('emailslack');
    expect(component.alertingCheckbox1Checked).toBeTruthy();
  })
});
