import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {FormBuilder, Validators} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {environment} from '../../../environments/environment';
import {PasswordRecoveryService} from '../../shared/validators/password-recovery/password-recovery.service';
import {RegistrationValidatorService} from '../../shared/validators/registration/registration-validator.service';
import {Swal} from '../../shared/utilities/swal';
import swal from "sweetalert2";
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-user-settings',
  templateUrl: './user-settings.component.html',
  styleUrls: ['./user-settings.component.css']
})
export class UserSettingsComponent implements OnInit {

  userDetails: any;

  emailForm: any;

  passwordForm: any;

  updatePersonalsForm: any;

  modalReference = null;


  constructor( private http: HttpClient,
               private formBuilder: FormBuilder,
               private route: ActivatedRoute,
               private registrationValidator: RegistrationValidatorService,
               private modalService: NgbModal) { }

  ngOnInit() {
    this.emailForm = this.formBuilder.group({
      email: [
        '', [ Validators.required, this.registrationValidator.emailValidator ],
        this.registrationValidator.validateEmailNotTaken.bind(this.registrationValidator)
      ]
    });

    this.passwordForm = this.formBuilder.group({
      currentPassword: [ '', [ Validators.required ] ],
      newPassword: [ '', [ Validators.required, this.registrationValidator.passwordValidator ] ]
    });

    this.updatePersonalsForm = this.formBuilder.group({
      name: [ '', [ Validators.required, this.registrationValidator.nameValidator ] ],
      surname: [ '', [ Validators.required, this.registrationValidator.surnameValidator ] ]
    });

    this.http.get<any>(environment.baseUrl + '/secure/settings/user')
      .subscribe((data) => {
        this.userDetails = data;
      });
  }

  update(edit) {
    this.updatePersonalsForm.controls.name.setValue(this.userDetails.name);
    this.updatePersonalsForm.controls.surname.setValue(this.userDetails.surname);
    this.modalReference = this.modalService.open(edit, { ariaLabelledBy: 'updatePersonals' });
  }

  updateUserEmail(edit) {
    this.emailForm.controls.email.setValue(this.userDetails.email);
    this.modalReference = this.modalService.open(edit, { ariaLabelledBy: 'updateEmail' });
  }

  updateUserPassword(edit) {
    this.modalReference = this.modalService.open(edit, { ariaLabelledBy: 'updatePassword' });
  }

  updatePersonals() {
    if (this.updatePersonalsForm.valid) {
      this.http.put<any>(environment.baseUrl + '/secure/settings/user', this.updatePersonalsForm.value)
        .subscribe(
          (result) => {
            Swal.swalSuccessMessageWithReload(result.message, location);
          },
          error => {
            Swal.swalErrorMessage(error.error[0].message);
          }
        );
      swal.fire({
        showConfirmButton: true
      });
    }
  }

  updateEmail() {
    if (this.emailForm.valid) {
      const body = new FormData();
      body.append('email', this.emailForm.get('email').value);
      this.http.post<any>(environment.baseUrl + '/secure/settings/user/email', body)
        .subscribe(
          (result) => {
            Swal.swalSuccessMessageWithReload(result.message, location);
          },
          error => {
            Swal.swalErrorMessage(error.error[0].message);
          }
        );
      swal.fire({
        showConfirmButton: true
      });
    }
  }

  updatePassword() {
    if (this.passwordForm.valid) {
      this.http.patch<any>(environment.baseUrl + '/secure/settings/user/password', this.passwordForm.value)
        .subscribe(
          (result) => {
            Swal.swalSuccessMessageWithReload(result.message, location);
          },
          error => {
            Swal.swalErrorMessage(error.error[0].message);
          }
        );
      swal.fire({
        showConfirmButton: true
      });
    }
  }

}
