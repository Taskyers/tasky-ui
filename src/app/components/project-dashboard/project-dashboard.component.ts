import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbDropdown, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Swal } from '../../shared/utilities/swal';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'app-project-dashboard',
    templateUrl: './project-dashboard.component.html',
    styleUrls: [ './project-dashboard.component.css' ]
})
export class ProjectDashboardComponent implements OnInit {

    projectName: string;

    data: any;

    dataTasks: any;

    modalReference = null;

    projectInvitationForm: any;

    debouncer: any;

    usernames: any = [];

    usernamesSize: any;

    dataTasksLenght: any;

    constructor(private http: HttpClient,
                private route: ActivatedRoute,
                private modalService: NgbModal,
                private formBuilder: FormBuilder,
                private authService: AuthService,
                private router: Router) { }

    ngOnInit() {
        this.projectName = this.route.snapshot.paramMap.get('project');
        this.http.get<any>(environment.baseUrl + '/secure/dashboard/' + this.projectName).subscribe((data) => {
            this.data = data;
            this.dataTasks = data.tasks;
            this.dataTasksLenght = data.tasks.length;
            console.log(data);
        });

        this.projectInvitationForm = this.formBuilder.group({
            username: [ '', [ Validators.required ] ],
            projectName: [ this.projectName, [ Validators.required ] ],
        });
    }

    open(content) {
        this.modalReference = this.modalService.open(content, { ariaLabelledBy: 'inviteToProjectModal' });
    }

    invite() {
        if ( this.projectInvitationForm.valid ) {
            const body = new FormData();
            body.append('username', this.projectInvitationForm.get('username').value);
            body.append('projectName', this.projectInvitationForm.get('projectName').value);
            this.http.post<any>(environment.baseUrl + '/secure/projectInvitation/invitationToken', body)
                .subscribe(
                    (result) => {
                        Swal.swalSuccessMessageWithRouting(result.message, this.router, 'secure/' + this.projectName + '/dashboard');
                    },
                    error => {
                        Swal.swalErrorMessage(error.error.message);
                    }
                );
        }

    }

    getUsernameList() {

        return new Promise(resolve => {

            if ( this.projectInvitationForm.get('username').value.length > 0 ) {
                this.authService.dynamicSearchUsernameList(this.projectInvitationForm.get('username').value).subscribe((res) => {
                    this.usernames = res;
                    this.usernamesSize = this.usernames.length;
                });
            }
            this.debouncer = setTimeout(() => {

            }, 50);

        });

    }

    setValue(username: any) {
        this.projectInvitationForm.get('username').setValue(username);
    }

    showBoard() {
        this.http.get<any>(environment.baseUrl + '/secure/board/' + this.projectName)
            .subscribe((data) => {
                if ( data.message == null ) {
                    this.router.navigate([ '/secure/sprintBoard/' + this.projectName ]);
                } else {
                    Swal.swalErrorMessage(data.message);
                }
            });
    }
}
