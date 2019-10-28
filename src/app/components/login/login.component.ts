import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import swal from 'sweetalert2';
import { environment } from '../../../environments/environment';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: [ './login.component.css' ]
})
export class LoginComponent implements OnInit {
    loginForm: any;

    constructor(
        private http: HttpClient,
        private formBuilder: FormBuilder,
        private router: Router
    ) { }

    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            username: [ '', [ Validators.required ] ],
            password: [ '', [ Validators.required ] ],
        });
    }

    onSubmit() {
        let isSuccess = false;
        if ( this.loginForm.valid ) {
            this.http.post(environment.baseUrl + '/login', this.loginForm.value)
                .subscribe(
                    (result) => {
                        isSuccess = true;
                        this.router.navigate([ '/secure' ]);
                    },
                    error => {
                        if ( !isSuccess ) {
                            swal.fire({
                                type: 'error',
                                title: 'Invalid username and/or password!',
                                showConfirmButton: true,
                                timer: 2500
                            });
                        }
                    }
                );

        }
    }
}
