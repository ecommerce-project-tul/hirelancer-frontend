import { EUserRole } from '../../Types/EUserRole';

export interface RegistrationRequest {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    role: EUserRole;
 }