import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { NewTaskValidatorService } from '../../validators/newTask/new-task-validator.service';

@Component({
    selector: 'new-task-message',
    template: `<div *ngIf = "this.errorMessage !== null">{{errorMessage}}</div>`
})
export class NewTaskMessagesComponent implements OnInit {

    @Input() control: FormControl;

    constructor() { }

    get errorMessage() {
        for ( const propertyName in this.control.errors ) {
            if ( this.control.errors.hasOwnProperty(propertyName) && this.control.touched ) {
                return NewTaskValidatorService.getValidatorErrorMessage(propertyName);
            }
        }
        return null;
    }

    ngOnInit() {
    }

}
