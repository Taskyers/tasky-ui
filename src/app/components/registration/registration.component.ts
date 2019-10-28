import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { RegistrationValidatorService } from '../../shared/validators/registration/registration-validator.service';
import swal from 'sweetalert2';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';

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
        private router: Router
    ) { }

    ngOnInit() {
        this.userForm = this.formBuilder.group({
            username: [ '', [ Validators.required ] ],
            email: [ '', [ Validators.required, RegistrationValidatorService.emailValidator ] ],
            password: [ '', [ Validators.required, RegistrationValidatorService.passwordValidator ] ],
            name: [ '', [ Validators.required, RegistrationValidatorService.nameValidator ] ],
            surname: [ '', [ Validators.required, RegistrationValidatorService.surnameValidator ] ]
        });
    }

    onSubmit() {
        let isSuccess = false;
        if ( this.userForm.valid ) {
            this.http.post<any>(environment.baseUrl + '/register', this.userForm.value)
                .subscribe(
                    (result) => {
                        isSuccess = true;
                        swal.update({
                            type: 'success',
                            title: 'Success!',
                            text: result.message
                        });
                    },
                    error => {
                        swal.update({
                            type: 'error',
                            title: 'Something went wrong',
                        });
                    }
                );
            swal.fire({
                showConfirmButton: true
            }).then(() => {
                if ( isSuccess ) {
                    this.router.navigate([ '' ]);
                }
            });
        }
    }
}



