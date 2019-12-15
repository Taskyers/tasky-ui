import { Component, OnInit } from '@angular/core';
import { LoginComponent } from '../login/login.component';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Component({
    selector: 'app-page-not-found',
    templateUrl: './page-not-found.component.html',
    styleUrls: [ './page-not-found.component.css' ]
})
export class PageNotFoundComponent implements OnInit {

    errorImagePath = '../../assets/errors/pageNotFound.png';

    constructor(private router: Router,
                private http: HttpClient) { }

    ngOnInit() {
    }

    back() {
        this.http.get(environment.baseUrl + '/isLoggedIn').subscribe(res => {
            if ( res ) {
                this.router.navigate([ 'secure/mainDashboard' ]);
            } else {
                this.router.navigate([ '/' ]);
            }
        });
    }

}
