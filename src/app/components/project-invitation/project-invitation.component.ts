import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { Swal } from '../../shared/utilities/swal';

@Component({
    selector: 'app-project-invitation',
    templateUrl: './project-invitation.component.html',
    styleUrls: [ './project-invitation.component.css' ]
})
export class ProjectInvitationComponent implements OnInit {
    projectInvitationForm: any;

    constructor(
        private http: HttpClient,
        private formBuilder: FormBuilder,
        private router: Router
    ) { }

    ngOnInit() {
        this.projectInvitationForm = this.formBuilder.group({
            username: [ '', [ Validators.required] ],
            projectName: [ '', [ Validators.required ] ],
        });
    }

    onSubmit() {
        if ( this.projectInvitationForm.valid ) {
            const body = new FormData();
            body.append('username', this.projectInvitationForm.get('username').value);
            body.append('projectName', this.projectInvitationForm.get('projectName').value);
            this.http.post<any>(environment.baseUrl + '/secure/projectInvitation/invitationToken', body)
                .subscribe(
                    (result) => {
                        Swal.swalSuccessMessageWithRouting(result.message, this.router, 'mainDashboard');
                    },
                    error => {
                    }
                );
        }

    }

}
