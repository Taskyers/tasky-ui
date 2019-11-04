import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class AuthService {

  constructor(private http: HttpClient) { }


  checkEmailNotTaken(email: string) {
    return this.http.get('https://localhost:8443/register/checkByEmail/' + email);
  }
  checkUsernameNotTaken(username: string) {
    return this.http.get('https://localhost:8443/register/checkByUsername/' + username);
  }

}
