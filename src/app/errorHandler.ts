import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()
export class ErrorHandler {
    constructor(
        private router: Router
    ) { }

    public handleError(err: any) {
        if ( err.status === 403 || err.status === 404) {
            this.router.navigate([ '/pageNotFound' ]);
        }
    }
}
