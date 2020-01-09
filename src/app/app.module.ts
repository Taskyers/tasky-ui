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
import {
    DateAdapter,
    MAT_DATE_FORMATS, MAT_DATE_LOCALE,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatNativeDateModule,
    MatSlideToggleModule, MatTooltipModule
} from '@angular/material';
import { SprintsListComponent } from './components/sprints-list/sprints-list.component';
import { SprintMessagesComponent } from './shared/messages/sprint-messages/sprint-messages.component';
import { SprintValidatorService } from './shared/validators/sprints/sprint-validator.service';
import { MatDatepickerModule } from '@angular/material';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { ProjectDashboardComponent } from './components/project-dashboard/project-dashboard.component';
import { EntrySettingsComponent } from './components/entry-settings/entry-settings.component';
import { EntriesService } from './services/entries.service';
import { EntrySettingsMessagesComponent } from './shared/messages/entry-settings-messages/entry-settings-messages.component';
import { ColorPickerModule } from 'ngx-color-picker';
import { TaskDetailsComponent } from './components/task-details/task-details.component';

export let InjectorInstance: Injector;

const appRoutes: Routes = [
    { path: 'register', component: RegistrationComponent },
    { path: 'login', component: LoginComponent },
    { path: 'secure/mainDashboard', component: MainDashboardComponent },
    { path: '', component: HomeComponent },
    { path: 'activateAccount/:key', component: AccountActivationComponent },
    { path: 'recovery', component: PasswordRecoveryComponent },
    { path: 'passwordRecovery/:token', component: UpdatePasswordComponent },
    { path: 'pageNotFound', component: PageNotFoundComponent },
    { path: 'secure/viewAllProjects', component: ViewAllProjectsComponent },
    { path: 'secure/:project/invite', component: ProjectInvitationComponent },
    { path: 'secure/projectInvitation/:token', component: ProjectInvitationAcceptComponent },
    { path: 'secure/:project/settings', component: ProjectSettingsComponent },
    { path: 'secure/:project/users', component: ProjectUserListComponent },
    { path: 'secure/:project/users/update/:userId', component: UpdateUserComponent },
    { path: 'secure/:project/sprints/list', component: SprintsListComponent },
    { path: 'secure/:project/dashboard', component: ProjectDashboardComponent },
    { path: 'secure/:project/entries/:type', component: EntrySettingsComponent },
    { path: 'secure/tasks/:key', component: TaskDetailsComponent },

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
        SprintsListComponent,
        SprintMessagesComponent,
        EntrySettingsComponent,
        EntrySettingsMessagesComponent,
        ProjectDashboardComponent,
        TaskDetailsComponent,
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
        MatSlideToggleModule,
        MatDatepickerModule,
        MatFormFieldModule,
        MatNativeDateModule,
        MatIconModule,
        MatInputModule,
        ColorPickerModule,
        MatTooltipModule
    ],
    providers: [
        RegistrationValidatorService,
        SprintValidatorService,
        AuthService,
        { provide: HTTP_INTERCEPTORS, useClass: HttpRequestInterceptor, multi: true },
        ErrorHandler,
        NgbActiveModal,
        NgbModal,
        MatDatepickerModule,
        { provide: DateAdapter, useClass: MomentDateAdapter, deps: [ MAT_DATE_LOCALE ] },
        { provide: MAT_DATE_FORMATS, useValue: SprintsListComponent.dateFormat },
        EntriesService
    ],
    exports: [ MatDatepickerModule ],
    bootstrap: [ AppComponent ]
})
export class AppModule {
    constructor(private injector: Injector) {
        InjectorInstance = this.injector;
    }
}
