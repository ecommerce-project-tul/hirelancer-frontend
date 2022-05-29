import { EUserRole } from 'Api/Types/EUserRole';
import { PassThrough } from 'stream';
import * as Yup from 'yup';
// import {addDays} from 'date-fns';

const PASSWORD_LENGTH = 6;
const FIRSTNAME_LENGTH = 3;
const LASTNAME_LENGTH = 3;

export const validationSchema = Yup.object().shape({
  email: Yup.string().email('Nieprawidowy email').required('Wymagane'),
  password: Yup.string().min(PASSWORD_LENGTH, `Please enter more than ${PASSWORD_LENGTH} characters`).required('Wymagane'),
  firstName: Yup.string().min(FIRSTNAME_LENGTH, `Please enter more than ${FIRSTNAME_LENGTH} characters`).required('Wymagane'),
  lastName: Yup.string().min(LASTNAME_LENGTH, `Please enter more than ${LASTNAME_LENGTH} characters`).required('Wymagane'),
  // deadlineDate: Yup.date().min(addDays(new Date(), 1)).required('Wymagane'),
  role: Yup.mixed<EUserRole>().oneOf(Object.values(EUserRole), 'Please enter valid user role').required('Wymagane'),
});
