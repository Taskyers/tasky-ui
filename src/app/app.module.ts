import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { Injector } from '@angular/core';

import { AppComponent } from './app.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { HomeComponent } from './components/home/home.component';
import { FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { RegistrationMessagesComponent } from './shared/messages/registration-messages/registration-messages.component';
import { FooterComponent } from './components/footer/footer.component';
import { LoginComponent } from './components/login/login.component';
import { LoginMessagesComponent } from './shared/messages/login-messages/login-messages.component';
import { MainDashboardComponent } from './components/main-dashboard/main-dashboard.component';
import { HeaderHomeComponent } from './components/header-home/header-home.component';
import { AccountActivationComponent } from './components/account-activation/account-activation.component';
import { PasswordRecoveryComponent } from './components/password-recovery/password-recovery.component';
import { PasswordRecoveryMessagesComponent } from './shared/messages/password-recovery-messages/password-recovery-messages.component';
import { UpdatePasswordComponent } from './components/update-password/update-password.component';
import { AuthService } from './services/auth.service';
import { HeaderMainComponent } from './components/header-main/header-main.component';
import { NgbActiveModal, NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpRequestInterceptor } from './shared/utilities/HttpRequestInterceptor';
import { ErrorHandler } from './errorHandler';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { NewProjectMessagesComponent } from './shared/messages/new-project-messages/new-project-messages.component';
import { ViewAllProjectsComponent } from './components/view-all-projects/view-all-projects.component';
import { ProjectInvitationComponent } from './components/project-invitation/project-invitation.component';
import { ProjectInvitationAcceptComponent } from './components/project-invitation-accept/project-invitation-accept.component';
import { RegistrationValidatorService } from './shared/validators/registration/registration-validator.service';
import { ProjectInvitationMessagesComponent } from './shared/messages/project-invitation-messages/project-invitation-messages.component';
import { ProjectSettingsComponent } from './components/project-settings/project-settings.component';
import { ProjectSettingsMessagesComponent } from './shared/messages/project-settings-messages/project-settings-messages.component';
import { AutosizeModule } from 'ngx-autosize';
import { ProjectUserListComponent } from './components/project-user-list/project-user-list.component';
import { UpdateUserComponent } from './components/update-user/update-user.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatSlideToggleModule} from '@angular/material';

export let InjectorInstance: Injector;

const appRoutes: Routes = [
    { path: 'register', component: RegistrationComponent },
    { path: 'login', component: LoginComponent },
    { path: 'mainDashboard', component: MainDashboardComponent },
    { path: '', component: HomeComponent },
    { path: 'activateAccount/:key', component: AccountActivationComponent },
    { path: 'recovery', component: PasswordRecoveryComponent },
    { path: 'passwordRecovery/:token', component: UpdatePasswordComponent },
    { path: 'pageNotFound', component: PageNotFoundComponent },
    { path: 'viewAllProjects', component: ViewAllProjectsComponent },
    { path: 'projectInvite', component: ProjectInvitationComponent },
    { path: 'secure/projectInvitation/:token', component: ProjectInvitationAcceptComponent },
    { path: 'viewAllProjects/:project', component: ProjectSettingsComponent },
    { path: 'mainDashboard/:project', component: ProjectSettingsComponent },
    { path: 'secure/projectUserList/:project', component: ProjectUserListComponent },
    { path: 'secure/projectUserList/update/:userId/:project', component: UpdateUserComponent },

];

@NgModule({
    declarations: [
        AppComponent,
        RegistrationComponent,
        RegistrationMessagesComponent,
        HomeComponent,
        FooterComponent,
        LoginComponent,
        LoginMessagesComponent,
        MainDashboardComponent,
        HeaderHomeComponent,
        AccountActivationComponent,
        PasswordRecoveryComponent,
        PasswordRecoveryMessagesComponent,
        UpdatePasswordComponent,
        HeaderMainComponent,
        PageNotFoundComponent,
        NewProjectMessagesComponent,
        ViewAllProjectsComponent,
        ProjectInvitationComponent,
        ProjectInvitationAcceptComponent,
        ProjectInvitationMessagesComponent,
        ProjectSettingsComponent,
        ProjectSettingsMessagesComponent,
        ProjectUserListComponent,
        UpdateUserComponent,
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        RouterModule.forRoot(appRoutes),
        FormsModule,
        ReactiveFormsModule,
        NgbModule,
        AutosizeModule,
        BrowserAnimationsModule,
        MatSlideToggleModule
    ],
    providers: [
        RegistrationValidatorService,
        AuthService,
        { provide: HTTP_INTERCEPTORS, useClass: HttpRequestInterceptor, multi: true },
        ErrorHandler,
        NgbActiveModal,
        NgbModal
    ],
    bootstrap: [ AppComponent ]
})
export class AppModule {
    constructor(private injector: Injector) {
        InjectorInstance = this.injector;
    }
}
