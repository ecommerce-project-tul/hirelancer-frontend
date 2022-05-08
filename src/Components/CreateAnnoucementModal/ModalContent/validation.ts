import * as Yup from 'yup';
import { addDays } from 'date-fns';

export const validationSchema = Yup.object().shape({
  email: Yup.string().email('Nieprawidowy email').required('Wymagane'),
  description: Yup.string().required('Wymagane'),
  startingPrice: Yup.number().required('Wymagane'),
  deadlineDate: Yup.date().min(addDays(new Date(), 1), 'Ustaw póxniejszą datę').required('Wymagane'),
  tagName: Yup.string().required('Wymagane'),
});
