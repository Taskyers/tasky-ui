import { Component, Input, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

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

    constructor(private http: HttpClient) {
        this.paginationLimit = 5;
        this.startPagination = 0;
    }

    ngOnInit() {
        this.http.get(environment.baseUrl + '/secure/mainDashboard/projects')
            .subscribe((data) => {
                this.projects = data;
                this.length = Object.keys(data).length;
            });
    }

    showMoreItems() {
        this.paginationLimit += 3;
    }

    showLessItems() {
        this.paginationLimit -= 3;
    }

}
