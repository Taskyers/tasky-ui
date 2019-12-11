import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { ActivatedRoute } from '@angular/router';
import { ProjectDashboardModel } from '../../shared/models/project-dashboard.model';

@Component({
    selector: 'app-project-dashboard',
    templateUrl: './project-dashboard.component.html',
    styleUrls: [ './project-dashboard.component.css' ]
})
export class ProjectDashboardComponent implements OnInit {

    projectName: string;

    data: ProjectDashboardModel;

    constructor(private http: HttpClient, private route: ActivatedRoute) { }

    ngOnInit() {
        this.projectName = this.route.snapshot.paramMap.get('project');
        this.http.get(environment.baseUrl + '/secure/dashboard/' + this.projectName).subscribe((data: ProjectDashboardModel) => {
            this.data = data;
        });
    }

}
