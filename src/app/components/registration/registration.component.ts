import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { AbstractControl, FormBuilder, ValidatorFn, Validators } from '@angular/forms';
import { RegistrationValidatorService } from '../../shared/validators/registration/registration-validator.service';
import swal from 'sweetalert2';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { Swal } from '../../shared/utilities/swal';

@Component({
    selector: 'app-registration',
    templateUrl: './registration.component.html',
    styleUrls: [ './registration.component.css' ]
})
export class RegistrationComponent implements OnInit {
    userForm: any;

    constructor(
        private http: HttpClient,
        private formBuilder: FormBuilder,
        private router: Router,
        private registrationValidator: RegistrationValidatorService
    ) { }

    ngOnInit() {
        this.userForm = this.formBuilder.group({
            username: [ '', [ Validators.required ], this.registrationValidator.validateUsernameNotTaken.bind(this.registrationValidator) ],
            email: [
                '', [ Validators.required, this.registrationValidator.emailValidator ],
                this.registrationValidator.validateEmailNotTaken.bind(this.registrationValidator)
            ],
            password: [ '', [ Validators.required, this.registrationValidator.passwordValidator ] ],
            name: [ '', [ Validators.required, this.registrationValidator.nameValidator ] ],
            surname: [ '', [ Validators.required, this.registrationValidator.surnameValidator ] ]
        });
    }

    onSubmit() {
        let isSuccess = false;
        if ( this.userForm.valid ) {
            this.http.post<any>(environment.baseUrl + '/register', this.userForm.value)
                .subscribe(
                    (result) => {
                        isSuccess = true;
                        Swal.swalSuccessMessageWithRouting(result.message, this.router, '');
                    },
                    error => {
                        Swal.swalRegistrationFail();
                    }
                );
            swal.fire({
                showConfirmButton: true
            });
        }
    }
}



