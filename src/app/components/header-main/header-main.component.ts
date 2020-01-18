import { Component, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, Validators } from '@angular/forms';
import { Swal } from '../../shared/utilities/swal';
import swal from 'sweetalert2';
import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'app-header-main',
    templateUrl: './header-main.component.html',
    styleUrls: [ './header-main.component.css' ]
})
export class HeaderMainComponent implements OnInit {
    newProjectForm: any;

    searchForm: any;

    modalReference = null;

    loupeIconPath = '../../assets/icons/loupe.png';

    debouncer: any;

    taskList: any;

    taskListSize = 0;

    constructor(
        private http: HttpClient,
        private router: Router,
        private modalService: NgbModal,
        private formBuilder: FormBuilder,
        private authService: AuthService
    ) { }

    ngOnInit() {
        this.newProjectForm = this.formBuilder.group({
            name: [ '', [ Validators.required ] ],
            description: [ '' ]
        });

        this.searchForm = this.formBuilder.group({
            search: [ '' ]
        });
    }

    logout() {
        this.http.post(environment.baseUrl + '/logout', '').subscribe((response) => response);
        this.router.navigate([ '' ]);
    }

    open(content) {
        this.modalReference = this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
    }

    onSubmit() {
        if ( this.newProjectForm.valid ) {
            this.http.post<any>(environment.baseUrl + '/secure/projects', this.newProjectForm.value)
                .subscribe(
                    (result) => {
                        Swal.swalSuccessMessageWithReload(result.message, location);
                        this.modalReference.close();

                    },
                    error => {
                        Swal.swalRegistrationFailWithMessage(error.error[ 0 ].message);
                    }
                );
        }
    }

    getUsernameList() {

        return new Promise(resolve => {
            if ( this.searchForm.get('search').value.length > 0 ) {
                this.authService.dynamicSearchTaskList(this.searchForm.get('search').value).subscribe((res) => {
                    this.taskList = res;
                    this.taskListSize = this.taskList.length;
                });
                this.debouncer = setTimeout(() => {
                }, 50);
            }
        });

    }

    search(key: string) {
        this.router.navigate([ '../secure/tasks/' + key ]).then(page => {
            location.reload();
        });
    }
}
