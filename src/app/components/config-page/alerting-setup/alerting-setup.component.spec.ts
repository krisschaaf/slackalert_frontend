import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { AlertingSetupComponent } from './alerting-setup.component';

describe('AlertingSetupComponent', () => {
  let component: AlertingSetupComponent;
  let fixture: ComponentFixture<AlertingSetupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, MatSnackBarModule],
      declarations: [ AlertingSetupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlertingSetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
