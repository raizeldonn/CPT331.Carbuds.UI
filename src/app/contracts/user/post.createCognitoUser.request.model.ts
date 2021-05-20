export interface PostCreateCognitoUserRequest {
    email: string;
    password: string;
    name: string;
    cardNumber: string;
    cardExpiry: string;
    cardCvv: string;
    licenseCountry: string;
    licenseNumber: string;
}