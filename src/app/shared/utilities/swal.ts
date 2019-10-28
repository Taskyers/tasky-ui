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

    static swalSuccessMessageWithRouting(message, router) {
        swal.fire({
            type: 'success',
            title: 'Success!',
            text: message,
            timer: 5000,
            showConfirmButton: false,
        }).then(() => {
            router.navigate([ '' ]);
        });
    }

    static swalRegistrationFail() {
        swal.fire({
            type: 'error',
            title: 'Something went wrong!',
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
