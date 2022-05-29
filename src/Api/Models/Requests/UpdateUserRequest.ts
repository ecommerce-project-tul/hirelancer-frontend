import { User } from 'Api/Types/User';

export interface UpdateUserRequest extends Partial<User> {
    email: string;
}