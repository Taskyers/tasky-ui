import { Component, Input, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { environment } from '../../../environments/environment';
import { Swal } from '../../shared/utilities/swal';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SprintValidatorService } from '../../shared/validators/sprints/sprint-validator.service';

@Component({
    selector: 'app-sprints-list',
    templateUrl: './sprints-list.component.html',
    styleUrls: [ './sprints-list.component.css' ]
})
export class SprintsListComponent implements OnInit {

    constructor(
        private http: HttpClient,
        private formBuilder: FormBuilder,
        private modalService: NgbModal,
        private route: ActivatedRoute,
        private sprintValidator: SprintValidatorService) { }

    static exportedProjectName: any;

    static exportedSprintName: any;

    static dateFormat = {
        parse: {
            dateInput: 'LL',
        },
        display: {
            dateInput: 'YYYY-MM-DD',
            monthYearLabel: 'YYYY',
            dateA11yLabel: 'LL',
            monthYearA11yLabel: 'YYYY',
        },
    };

    @Input()
    sprints: any;

    length: any;

    projectName: string;

    sprintId: number;

    updateSprintForm: any;

    createSprintForm: any;

    oldSprintName: any;

    newSprintName = '';

    modalReference = null;

    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
        })
    };

    ngOnInit() {
        this.updateSprintForm = this.formBuilder.group({
            id: [ '' ],
            current: [ '' ],
            name: [ '', [ Validators.required, ], this.sprintValidator.sprintNameValidator.bind(this.sprintValidator) ],
            start: [ '' ],
            end: [ '' ],
        });

        this.projectName = this.route.snapshot.paramMap.get('project');
        SprintsListComponent.exportedProjectName = this.projectName;
        this.http.get<any>(environment.baseUrl + '/secure/project/settings/sprints/' + this.projectName)
            .subscribe((data) => {
                this.sprints = data;
                this.length = Object.keys(data).length;
            });
    }

    async delete(sprintId: any) {
        if ( await Swal.swalDelete('Once deleted, you will not be able to recover this sprint!') ) {
            this.http.delete<any>(environment.baseUrl + '/secure/project/settings/sprints/' + sprintId)
                .subscribe(res => {
                    Swal.swalSuccessMessageWithReload(res.message, location);
                }, error => {
                    Swal.swalErrorMessage(error.message);

                });
        }
    }

    openUpdateModal(content, sprintId) {
        this.http.get<any>(environment.baseUrl + '/secure/project/settings/sprints/data/' + sprintId).subscribe(data => {
            SprintsListComponent.exportedSprintName = data.name;
            this.oldSprintName = data.name;
            this.sprintId = sprintId;
            this.updateSprintForm.controls.id.setValue(data.id);
            this.updateSprintForm.controls.current.setValue(data.current);
            this.updateSprintForm.controls.name.setValue(data.name);
            this.updateSprintForm.controls.start.setValue(data.start);
            this.updateSprintForm.controls.end.setValue(data.end);
        });
        this.modalReference = this.modalService.open(content, { ariaLabelledBy: 'updateModal' });
    }

    update() {
        this.http.put<any>(environment.baseUrl + '/secure/project/settings/sprints/' + this.sprintId, this.updateSprintForm.value,
            this.httpOptions).subscribe(res => {
            Swal.swalSuccessMessageWithReload(res.message, location);
        }, err => {
            console.log(err);
            Swal.swalErrorMessage(err.error[ 0 ].message);
        });
    }

    openCreateModal(content) {
        this.createSprintForm = this.formBuilder.group({
            name: [ '', [ Validators.required, ], this.sprintValidator.sprintNameValidator.bind(this.sprintValidator) ],
            start: [ '' ],
            end: [ '' ]
        });
        this.modalReference = this.modalService.open(content, { ariaLabelledBy: 'createModal' });
    }

    create() {

        this.http.post<any>(environment.baseUrl + '/secure/project/settings/sprints/' + this.projectName,
            this.createSprintForm.getRawValue())
            .subscribe(res => {
                Swal.swalSuccessMessageWithReload(res.message, location);
            }, err => {
                Swal.swalErrorMessage(err.error[ 0 ].message);
            });
    }

    setCreateStartDate(event: any) {
        this.createSprintForm.controls.start.setValue(event.target.value);
    }

    setCreateEndDate(event: any) {
        this.createSprintForm.controls.end.setValue(event.target.value);
    }

    getInput(event: any) {
        this.newSprintName = event.target.value;
    }
}
