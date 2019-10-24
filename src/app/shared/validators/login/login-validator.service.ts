export class LoginValidatorService {
    constructor() {}

    static getValidatorErrorMessage(validatorName: string, validatorValue?: any) {
        const config = {
            required: 'Field is required',
        };
        return config[ validatorName ];
    }
}
