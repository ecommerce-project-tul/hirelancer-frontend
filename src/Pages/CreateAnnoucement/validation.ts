import * as Yup from 'yup';

export const validationSchema = Yup.object().shape({
  email: Yup.string().email('Nieprawidowy email').required('Wymagane'),
  description: Yup.string().required('Wymagane'),
  startingPrice: Yup.string().required('Wymagane'),
  deadlineDate: Yup.string().required('Wymagane'),
  tagName: Yup.string().required('Wymagane'),
});
