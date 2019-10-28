import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import swal from 'sweetalert2';
import { environment } from '../../../environments/environment';

@Component({
    selector: 'app-account-activation',
    templateUrl: './account-activation.component.html',
    styleUrls: [ './account-activation.component.css' ]
})
export class AccountActivationComponent implements OnInit {

    key: string;

    data: any;

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
                        text: error.error.message
                    });
                }
            );
        swal.fire({
            showConfirmButton: true
        }).then(() => {
            this.router.navigate([ '' ]);
        });
    }

}
