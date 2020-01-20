import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute } from '@angular/router';
import { environment } from '../../../environments/environment';

@Component({
    selector: 'app-sprint-board',
    templateUrl: './sprint-board.component.html',
    styleUrls: [ './sprint-board.component.css' ]
})
export class SprintBoardComponent implements OnInit {

    projectName: any;

    sprintName: any;

    statuses: any;

    constructor(private http: HttpClient,
                private formBuilder: FormBuilder,
                private modalService: NgbModal,
                private route: ActivatedRoute) { }

    ngOnInit() {
        this.projectName = this.route.snapshot.paramMap.get('project');
        this.http.get<any>(environment.baseUrl + '/secure/board/' + this.projectName)
            .subscribe((data) => {
                console.log(data);
                this.sprintName = data.sprintName;
                this.statuses = data.statuses;
            });

    }

}
