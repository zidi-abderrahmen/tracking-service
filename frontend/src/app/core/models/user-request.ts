export interface UserRequest {
    idUser?: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role: 'ADMIN' | 'ENGINEER';
}