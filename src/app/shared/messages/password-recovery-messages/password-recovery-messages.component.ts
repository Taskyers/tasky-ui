import { Component, Input, OnInit } from '@angular/core';
import { PasswordRecoveryService } from '../../validators/password-recovery/password-recovery.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'password-recovery-messages',
  template: `<div *ngIf="this.errorMessage !== null">{{errorMessage}}</div>`
})
export class PasswordRecoveryMessagesComponent implements OnInit {

  @Input() control: FormControl;

  constructor() { }

  get errorMessage() {
    for ( const propertyName in this.control.errors ) {
      if ( this.control.errors.hasOwnProperty(propertyName) && this.control.touched ) {
        return PasswordRecoveryService.getValidatorErrorMessage(propertyName);
      }
    }
    return null;
  }

  ngOnInit() {
  }

}
