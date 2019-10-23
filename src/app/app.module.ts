import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import {Injector} from '@angular/core';

import { AppComponent } from './app.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { HomeComponent } from './components/home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegistrationMessagesComponent } from './shared/messages/registration-messages/registration-messages.component';
import { RegistrationValidatorService } from './shared/validators/registration/registration-validator.service';

export let InjectorInstance: Injector;

const appRoutes: Routes = [
  { path: 'register', component: RegistrationComponent },
  { path: '', component: HomeComponent }
];


@NgModule({
  declarations: [
    AppComponent,
    RegistrationComponent,
    RegistrationMessagesComponent,
    HomeComponent,
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
  constructor(private injector: Injector)
  {
    InjectorInstance = this.injector;
  }
}
