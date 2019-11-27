import { Component, Input, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Form, FormArray, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { environment } from '../../../environments/environment';

@Component({
    selector: 'app-update-user',
    templateUrl: './update-user.component.html',
    styleUrls: [ './update-user.component.css' ]
})
export class UpdateUserComponent implements OnInit {

    @Input()
    roleList: any;

    projectName: string;

    userId: string;

    length: number;

    rolesForm: any;


    constructor(private http: HttpClient,
                private formBuilder: FormBuilder,
                private route: ActivatedRoute) {

    }

    ngOnInit() {

        this.projectName = this.route.snapshot.paramMap.get('project');
        this.userId = this.route.snapshot.paramMap.get('userId');
        this.http.get<any>(environment.baseUrl + '/secure/project/settings/users/' + this.userId + '/' + this.projectName)
            .subscribe((data) => {
                this.roleList = data;
                this.length = Object.keys(data).length;
            });
    }

}
