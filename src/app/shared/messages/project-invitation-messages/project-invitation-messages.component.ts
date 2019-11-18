import { Component, Input, OnInit } from '@angular/core';
import { ProjectInvitationValidatorService } from '../../validators/projectInvitation/project-invitation-validator.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'project-invitation-message',
  template: `
		<div *ngIf = "this.errorMessage !== null">{{errorMessage}}</div>`
})
export class ProjectInvitationMessagesComponent implements OnInit {

  @Input() control: FormControl;

  constructor() { }

  get errorMessage() {
    for ( const propertyName in this.control.errors ) {
      if ( this.control.errors.hasOwnProperty(propertyName) && this.control.touched ) {
        return ProjectInvitationValidatorService.getValidatorErrorMessage(propertyName);
      }
    }
    return null;
  }

  ngOnInit() {
  }

}
