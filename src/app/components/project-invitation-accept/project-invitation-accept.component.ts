import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import { Swal } from '../../shared/utilities/swal';

@Component({
    selector: 'app-project-invitation-accept',
    templateUrl: './project-invitation-accept.component.html',
    styleUrls: [ './project-invitation-accept.component.css' ]
})
export class ProjectInvitationAcceptComponent implements OnInit {
    token: string;

  constructor(private route: ActivatedRoute,
              private http: HttpClient,
              private router: Router) { }

    ngOnInit() {
        this.token = this.route.snapshot.paramMap.get('token');
        this.http.patch<any>(environment.baseUrl + '/secure/projectInvitation/' + this.token, null)
            .subscribe(result => {
                Swal.swalSuccessMessageWithRouting(result.message, this.router, '');
            }, error => {
            });
    }

}
