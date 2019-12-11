import { Component, Input, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';
import { FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Router } from '@angular/router';
import { Swal } from '../../shared/utilities/swal';

@Component({
    selector: 'app-project-user-list',
    templateUrl: './project-user-list.component.html',
    styleUrls: [ './project-user-list.component.css' ]
})
export class ProjectUserListComponent implements OnInit {
    @Input()
    users: any;

    length: any;

    projectName: string;

    constructor(
        private http: HttpClient,
        private formBuilder: FormBuilder,
        private route: ActivatedRoute) { }

    ngOnInit() {
        this.projectName = this.route.snapshot.paramMap.get('project');
        this.http.get(environment.baseUrl + '/secure/project/settings/users/' + this.projectName)
            .subscribe((data) => {
                this.users = data;
                this.length = Object.keys(data).length;
            });
    }

    async delete(userId: any) {
        if ( await Swal.swalDelete('Are you sure to remove this user from that projectn') ) {
            this.http.delete<any>(environment.baseUrl + '/secure/project/settings/users/' + userId + '/' + this.projectName)
                .subscribe(res => {
                    Swal.swalSuccessMessageWithReload(res.message, location);
                }, error => {
                    Swal.swalErrorMessage(error.message);

                });
        }
    }

}
