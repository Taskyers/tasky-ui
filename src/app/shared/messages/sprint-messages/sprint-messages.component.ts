import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { SprintValidatorService } from '../../validators/sprints/sprint-validator.service';

@Component({
    selector: 'sprint-message',
    template: `
		<div *ngIf = "this.errorMessage !== null">{{errorMessage}}</div>`
})
export class SprintMessagesComponent implements OnInit {

    @Input() control: FormControl;

    constructor() { }

    get errorMessage() {
        for ( const propertyName in this.control.errors ) {
            if ( this.control.errors.hasOwnProperty(propertyName) && this.control.touched ) {
                return SprintValidatorService.getValidatorErrorMessage(propertyName);
            }
        }
        return null;
    }

    ngOnInit() {
    }

}
