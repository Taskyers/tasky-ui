import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Router} from '@angular/router';
import {PasswordRecoveryService} from '../../shared/validators/password-recovery/password-recovery.service';
import {environment} from '../../../environments/environment';
import {Swal} from '../../shared/utilities/swal';

@Component({
  selector: 'app-password-recovery',
  templateUrl: './password-recovery.component.html',
  styleUrls: ['./password-recovery.component.css']
})
export class PasswordRecoveryComponent implements OnInit {
  recoveryForm: any;
  body: any;
  constructor(
      private http: HttpClient,
      private formBuilder: FormBuilder,
      private router: Router) { }

  ngOnInit() {
    this.recoveryForm = this.formBuilder.group({
      email: [ '', [ Validators.required, PasswordRecoveryService.emailValidator] ]
    });
  }

  onSubmit() {
    if (this.recoveryForm.valid) {
      const body = new FormData();
      body.append('email', this.recoveryForm.get('email').value);
      this.http.post<any>(environment.baseUrl + '/passwordRecovery/requestToken', body)
        .subscribe(
          (result) => {
            Swal.swalSuccessMessageWithRouting(result.message, this.router, '');
          },
          error => {
            Swal.swalErrorMessageWithRouting(error.error.message, this.router, '');
          }
        );
    }
  }

}
