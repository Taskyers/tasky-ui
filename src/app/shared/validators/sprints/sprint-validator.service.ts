import { AbstractControl } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { SprintsListComponent } from '../../../components/sprints-list/sprints-list.component';
import { Injectable } from '@angular/core';

@Injectable()
export class SprintValidatorService {

    debouncer: any;

    constructor(private authService: AuthService
    ) {}

    static getValidatorErrorMessage(validatorName: string, validatorValue?: any) {
        const config = {
            required: 'Field is required',
            sprintNameTaken: 'Sprint name already taken'
        };
        return config[ validatorName ];
    }

    sprintNameValidator(control: AbstractControl) {
        clearTimeout(this.debouncer);

        return new Promise(resolve => {

            this.debouncer = setTimeout(() => {

                this.authService.checkSprintNameNotTaken(control.value, SprintsListComponent.exportedProjectName).subscribe((res) => {
                    if ( res === false || control.value === SprintsListComponent.exportedSprintName ) {
                        resolve(null);
                    } else {
                        resolve({ sprintNameTaken: true });
                    }
                });

            }, 50);

        });
    }

}
