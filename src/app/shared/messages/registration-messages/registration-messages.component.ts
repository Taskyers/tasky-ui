import { Component, Input, OnInit } from '@angular/core';
import { RegistrationValidatorService } from '../../validators/registration/registration-validator.service';
import { FormControl } from '@angular/forms';


@Component({
  selector: 'registration-message',
  template: `<div *ngIf="this.errorMessage !== null">{{errorMessage}}</div>`
})
export class RegistrationMessagesComponent implements OnInit {

  @Input() control: FormControl;
  constructor() { }

  get errorMessage() {
    for (const propertyName in this.control.errors) {
      if (this.control.errors.hasOwnProperty(propertyName) && this.control.touched) {
        return RegistrationValidatorService.getValidatorErrorMessage(propertyName);
      }
    }
    return null;
  }

  ngOnInit() {
  }

}
