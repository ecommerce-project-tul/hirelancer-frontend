import React, { memo } from 'react';
import Api from 'Api/api';
import { useParams } from 'react-router-dom';
import { useMutation, useQueryClient } from 'react-query';
import { Formik } from 'formik';
import { TextField } from '@mui/material';
import { toast } from 'material-react-toastify';
import Session from 'Api/session';
import { FormikField } from 'Components/FormikField';
import { FormikCheckbox } from 'Components/FormikCheckbox';
import { Button } from 'Components/Button';
import { Wrapper } from './styled';
import { validationSchema } from './validation';

interface Props {
  questionId: string;
  onSubmit?(): void;
}

export const AddAnswer = memo(({ onSubmit, questionId }: Props) => {
  const { announcementId } = useParams<{ announcementId: string }>();
  const queryClient = useQueryClient();
  const clientEmail: string = Session.getSessionObject()?.userEmail ?? '';
  const { mutate, isLoading } = useMutation(Api.addNewAnswer, {
    onSuccess: data => {
      toast.success(data.message);
    },
    onError: () => {
      toast.error('Wystąpil bląd!');
    },
    onSettled: () => {
      queryClient.invalidateQueries('announcementDetails');
    },
  });

  return (
    <Formik
      initialValues={{
        content: '',
      }}
      onSubmit={values => {
          mutate({
            announcementId: announcementId!,
            questionId: questionId,
            answer: { clientEmail: '', ...values },
          });
          if (onSubmit) onSubmit();
        }
      }
      validationSchema={validationSchema}
    >
      <Wrapper>
        <FormikField name="content" label="Odpowiedź" type="text" />
        <Button type="submit">Dodaj odpowiedź</Button>
      </Wrapper>
    </Formik>
  );
});
