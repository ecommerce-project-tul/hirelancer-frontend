import * as Yup from 'yup';

export const validationSchema = Yup.object().shape({
  content: Yup.string().required('Wymagane').min(5, 'Pytanie musi być dłuższe'),
});
