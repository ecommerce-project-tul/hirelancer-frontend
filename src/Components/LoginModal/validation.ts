import { EUserRole } from 'Api/Types/EUserRole';
import { PassThrough } from 'stream';
import * as Yup from 'yup';
// import {addDays} from 'date-fns';

const PASSWORD_LENGTH = 6;

export const validationSchema = Yup.object().shape({
  email: Yup.string().email('Nieprawidowy email').required('Wymagane'),
  password: Yup.string().min(PASSWORD_LENGTH, `Please enter more than ${PASSWORD_LENGTH} characters`).required('Wymagane'),
});
