import { Component, Input, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { FormBuilder, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Swal } from '../../shared/utilities/swal';
import swal from 'sweetalert2';

@Component({
    selector: 'app-main-dashboard',
    templateUrl: './main-dashboard.component.html',
    styleUrls: [ './main-dashboard.component.css' ]
})
export class MainDashboardComponent implements OnInit {

    @Input()
    projects: any;

    length: number;

    startPagination: number;

    paginationLimit: number;

    newProjectForm: any;

    modalReference = null;

    constructor(
        private http: HttpClient,
        private modalService: NgbModal,
        private formBuilder: FormBuilder) {
        this.paginationLimit = 5;
        this.startPagination = 0;
    }

    ngOnInit() {
        this.http.get(environment.baseUrl + '/secure/mainDashboard/projects')
            .subscribe((data) => {
                this.projects = data;
                this.length = Object.keys(data).length;
            });
        this.newProjectForm = this.formBuilder.group({
            name: [ '', [ Validators.required ] ],
            description: [ '' ]
        });
    }

    showMoreItems() {
        this.paginationLimit += 3;
    }

    showLessItems() {
        this.paginationLimit -= 3;
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

}
