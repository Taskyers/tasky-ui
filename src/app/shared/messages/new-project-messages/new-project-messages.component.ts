import { Component, Input, OnInit } from '@angular/core';
import { LoginValidatorService } from '../../validators/login/login-validator.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'new-project-message',
  template: `
		<div *ngIf = "this.errorMessage !== null">{{errorMessage}}</div>`
})
export class NewProjectMessagesComponent implements OnInit {

  @Input() control: FormControl;

  constructor() { }

  get errorMessage() {
    for ( const propertyName in this.control.errors ) {
      if ( this.control.errors.hasOwnProperty(propertyName) && this.control.touched ) {
        return LoginValidatorService.getValidatorErrorMessage(propertyName);
      }
    }
    return null;
  }

  ngOnInit() {
  }

}
