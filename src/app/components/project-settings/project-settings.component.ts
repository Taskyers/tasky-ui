import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { FormBuilder, Validators } from '@angular/forms';
import { catchError } from 'rxjs/operators';

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

    const;

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

        this.http.get(environment.baseUrl + '/secure/projects/settings/' + this.projectName)
            .subscribe((data: any) => {
                this.projectId = data.id;
                this.projectDescription = data.description;
            });
        this.updateProjectForm = this.formBuilder.group({
            name: [ '' ],
            description: [ '' ],
        });

    }

    delete() {
        this.http.delete(environment.baseUrl + '/secure/projects/settings/' + this.projectId).subscribe();
    }

    update() {
        console.log(this.updateProjectForm);

        this.http.put<any>(environment.baseUrl + '/secure/projects/settings/' + this.projectId, this.updateProjectForm.value,
            this.httpOptions).subscribe();
        this.router.navigate(['mainDashboard']).then(() => {
            window.location.reload();
        });
    }

}
