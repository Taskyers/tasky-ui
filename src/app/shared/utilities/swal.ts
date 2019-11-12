import swal from 'sweetalert2';

export class Swal {
    static swalLoginInvalidData() {
        swal.fire({
            type: 'error',
            title: 'Invalid username and/or password!',
            showConfirmButton: true,
            timer: 2500
        });
    }

    static swalLoginDefault() {
        swal.fire({
            type: 'error',
            title: 'Something went wrong!',
            showConfirmButton: true,
            timer: 2500
        });
    }

    static swalSuccessMessageWithRouting(message, router, page) {
        swal.fire({
            type: 'success',
            title: 'Success!',
            text: message,
            timer: 2500,
            showConfirmButton: false,
        }).then(() => {
            router.navigate([ page ]);
        });
    }

    static swalSuccessMessage(message) {
        swal.fire({
            type: 'success',
            title: 'Success!',
            text: message,
            timer: 2000,
            showConfirmButton: false,
        });
    }

    static swalRegistrationFail() {
        swal.fire({
            type: 'error',
            title: 'Something went wrong!',
            showConfirmButton: true
        });
    }

    static swalRegistrationFailWithMessage(message) {
        swal.fire({
            type: 'error',
            title: message,
            showConfirmButton: true
        });
    }

    static swalErrorMessageWithRouting(message, router) {
        swal.fire({
            type: 'error',
            title: 'Something went wrong',
            text: message,
            showConfirmButton: true
        }).then(() => {
            router.navigate([ '' ]);
        });
    }
}
