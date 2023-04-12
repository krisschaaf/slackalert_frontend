import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@auth0/auth0-angular';
import { AlertingSetupComponent } from './components/config-page/alerting-setup/alerting-setup.component';
import { ConfigPageComponent } from './components/config-page/config-page.component';
import { GitlabSetupComponent } from './components/config-page/gitlab-setup/gitlab-setup.component';
import { SlackSetupComponent } from './components/config-page/slack-setup/slack-setup.component';
import { WelcomePageComponent } from './components/welcome-page/welcome-page.component';

const routes: Routes = [
  { path: '', component: WelcomePageComponent },
  // { path: 'registration', component: RegistrationPageComponent },
  // { path: 'login', component: LoginPageComponent },
  {
    path: 'config',
    canActivate: [AuthGuard],
    children: [
      { path: '', component: ConfigPageComponent },
      { path: 'gitlab-setup', component: GitlabSetupComponent },
      { path: 'slack-setup', component: SlackSetupComponent },
      { path: 'alerting-setup', component: AlertingSetupComponent },
    ]
  },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
