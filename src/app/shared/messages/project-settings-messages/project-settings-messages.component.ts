import { Component, Input, OnInit } from '@angular/core';
import { ProjectSettingsValidatorService } from '../../validators/projectSettings/project-settings-validator.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'project-settings-message',
  template: `
		<div *ngIf = "this.errorMessage !== null">{{errorMessage}}</div>`
})
export class ProjectSettingsMessagesComponent implements OnInit {

  @Input() control: FormControl;

  constructor() { }

  get errorMessage() {
    for ( const propertyName in this.control.errors ) {
      if ( this.control.errors.hasOwnProperty(propertyName) && this.control.touched ) {
        return ProjectSettingsValidatorService.getValidatorErrorMessage(propertyName);
      }
    }
    return null;
  }

  ngOnInit() {
  }

}
