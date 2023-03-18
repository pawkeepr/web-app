

export const name = 'account'

export type AccountState = {
    loading: boolean,
    success: boolean,
    error: boolean
    message: string | null,
}

export type AccountSignUp = {
    email: string;
    password: string;
    passwordConfirm: string;
    termsOfUse: boolean;
    person: {
        firstName: string,
        lastName: string,
        crmv: string,
        document: string,
        company: string | null,
        phoneNumber: string,
    },
    address: {
        country: string;
        street: string;
        number: string;
        complement: string;
        neighborhood: string;
        city: string;
        state: string;
        zipCode: string;
    };
};