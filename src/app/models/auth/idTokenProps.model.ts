export interface IdTokenProps {
    userId: string;
    username : string;
    displayName : string;
    cognitoGroups: string[];
    tokenExpiry: number;
    email: string;
};