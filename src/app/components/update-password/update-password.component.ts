import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {FormBuilder, Validators} from '@angular/forms';
import {PasswordRecoveryService} from '../../shared/validators/password-recovery/password-recovery.service';
import {environment} from '../../../environments/environment';
import {Swal} from '../../shared/utilities/swal';

@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html',
  styleUrls: ['./update-password.component.css']
})
export class UpdatePasswordComponent implements OnInit {

  token: string;
  recoveryForm: any;

  constructor(private route: ActivatedRoute,
              private formBuilder: FormBuilder,
              private http: HttpClient,
              private router: Router) { }

  ngOnInit() {
    this.token = this.route.snapshot.paramMap.get('token');
    this.recoveryForm = this.formBuilder.group({
      password: [ '', [ Validators.required, PasswordRecoveryService.passwordValidator] ]
    });
  }

  onSubmit() {
    if (this.recoveryForm.valid) {
      const body = new FormData();
      body.append('password', this.recoveryForm.get('password').value);
      this.http.patch<any>(environment.baseUrl + '/passwordRecovery/' + this.token, body)
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
