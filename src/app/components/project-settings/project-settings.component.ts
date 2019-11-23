import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { FormBuilder, Validators } from '@angular/forms';
import { catchError } from 'rxjs/operators';
import { Swal } from '../../shared/utilities/swal';

@Component({
    selector: 'app-project-settings',
    templateUrl: './project-settings.component.html',
    styleUrls: [ './project-settings.component.css' ]
})
export class ProjectSettingsComponent implements OnInit {

    projectName: string;

    projectId: number;

    projectDescription: string;

    updateProjectForm: any;

    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
        })
    };

    constructor(private route: ActivatedRoute,
                private http: HttpClient,
                private router: Router,
                private formBuilder: FormBuilder) { }

    ngOnInit() {
        this.projectName = this.route.snapshot.paramMap.get('project');
        this.updateProjectForm = this.formBuilder.group({
            name: [ this.projectName, [ Validators.required ] ],
            description: [ '', [] ],
        });
        this.http.get(environment.baseUrl + '/secure/projects/settings/' + this.projectName)
            .subscribe((data: any) => {
                this.projectId = data.id;
                this.projectDescription = data.description;
                this.updateProjectForm.controls.description.setValue(data.description);
            });


    }

    delete() {
        this.http.delete<any>(environment.baseUrl + '/secure/projects/settings/' + this.projectId).subscribe(res => {
            Swal.swalSuccessMessageWithRouting(res.message, this.router, 'mainDashboard');
        });
    }

    update() {
        this.http.put<any>(environment.baseUrl + '/secure/projects/settings/' + this.projectId, this.updateProjectForm.value,
            this.httpOptions).subscribe(res => {
            Swal.swalSuccessMessageWithRouting(res.message, this.router, 'mainDashboard');
        }, err => {
            Swal.swalErrorMessage(err.error[0].message);
        });
    }

}
