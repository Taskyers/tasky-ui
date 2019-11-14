import { Component, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, Validators } from '@angular/forms';
import { Swal } from '../../shared/utilities/swal';
import swal from 'sweetalert2';

@Component({
    selector: 'app-header-main',
    templateUrl: './header-main.component.html',
    styleUrls: [ './header-main.component.css' ]
})
export class HeaderMainComponent implements OnInit {
    newProjectForm: any;

    modalReference = null;

    loupeIconPath = '../../assets/icons/loupe.png';

    constructor(
        private http: HttpClient,
        private router: Router,
        private modalService: NgbModal,
        private formBuilder: FormBuilder,
    ) { }

    ngOnInit() {
        this.newProjectForm = this.formBuilder.group({
            name: [ '', [ Validators.required ] ],
            description: [ '' ]
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
}
