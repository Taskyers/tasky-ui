import { Component, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
    selector: 'app-header-main',
    templateUrl: './header-main.component.html',
    styleUrls: [ './header-main.component.css' ]
})
export class HeaderMainComponent implements OnInit {

    loupeIconPath = '../../assets/icons/loupe.png';

    constructor(
        private http: HttpClient,
        private router: Router
    ) { }

    ngOnInit() {
    }

    logout() {
        this.http.post(environment.baseUrl + '/logout', '').subscribe((response) => response);
        this.router.navigate([ '' ]);
    }

}
