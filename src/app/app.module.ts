import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { Injector } from '@angular/core';

import { AppComponent } from './app.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { HomeComponent } from './components/home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegistrationMessagesComponent } from './shared/messages/registration-messages/registration-messages.component';
import { RegistrationValidatorService } from './shared/validators/registration/registration-validator.service';
import { FooterComponent } from './components/footer/footer.component';
import { LoginComponent } from './components/login/login.component';
import { LoginMessagesComponent } from './shared/messages/login-messages/login-messages.component';
import { SecureComponent } from './components/secure/secure.component';
import { HeaderHomeComponent } from './components/header-home/header-home.component';
import { AccountActivationComponent } from './components/account-activation/account-activation.component';
import { PasswordRecoveryComponent } from './components/password-recovery/password-recovery.component';
import { PasswordRecoveryMessagesComponent } from './shared/messages/password-recovery-messages/password-recovery-messages.component';
import { UpdatePasswordComponent } from './components/update-password/update-password.component';

export let InjectorInstance: Injector;

const appRoutes: Routes = [
  { path: 'register', component: RegistrationComponent },
  { path: 'login', component: LoginComponent },
  { path: 'secure', component: SecureComponent },
  { path: '', component: HomeComponent },
  { path: 'activateAccount/:key', component: AccountActivationComponent},
  { path: 'recovery', component: PasswordRecoveryComponent},
  { path: 'passwordRecovery/:token', component: UpdatePasswordComponent}
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
        SecureComponent,
        HeaderHomeComponent,
        AccountActivationComponent,
        PasswordRecoveryComponent,
        PasswordRecoveryMessagesComponent,
        UpdatePasswordComponent
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        RouterModule.forRoot(appRoutes),
        FormsModule,
        ReactiveFormsModule,
    ],
    providers: [
        RegistrationValidatorService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
    constructor(private injector: Injector) {
        InjectorInstance = this.injector;
    }
}
