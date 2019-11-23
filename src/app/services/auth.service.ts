import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable()
export class AuthService {

    constructor(private http: HttpClient) { }

    checkEmailNotTaken(email: string) {
        return this.http.get('https://localhost:8443/register/checkByEmail/' + email);
    }

    checkUsernameNotTaken(username: string) {
        return this.http.get('https://localhost:8443/register/checkByUsername/' + username);
    }

    dynamicSearchUsernameList(username: string) {
        return this.http.get(environment.baseUrl + '/secure/projectInvitation/search/' + username);
    }

}
