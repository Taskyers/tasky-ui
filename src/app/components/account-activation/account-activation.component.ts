import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import swal from 'sweetalert2';
import { environment } from '../../../environments/environment';
import { Swal } from '../../shared/utilities/swal';

@Component({
    selector: 'app-account-activation',
    templateUrl: './account-activation.component.html',
    styleUrls: [ './account-activation.component.css' ]
})
export class AccountActivationComponent implements OnInit {

    key: string;

    constructor(
        private route: ActivatedRoute,
        private http: HttpClient,
        private router: Router
    ) { }

    ngOnInit() {

        this.key = this.route.snapshot.paramMap.get('key');
        this.http.get<any>(environment.baseUrl + '/activateAccount/' + this.key)
            .subscribe(
                (result) => {
                    Swal.swalSuccessMessageWithRouting(result.message, this.router);
                },
                error => {
                    Swal.swalErrorMessageWithRouting(error.error.message, this.router);
                }
            );
    }

}
