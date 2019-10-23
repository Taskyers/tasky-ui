export class LoginValidatorService {
    constructor() {}

    static getValidatorErrorMessage(validatorName: string, validatorValue?: any) {
        const config = {
            required: 'required',
        };
        return config[ validatorName ];
    }
}
