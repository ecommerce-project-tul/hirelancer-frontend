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
  refetch(): void;
}

export const AddComment = memo(({ refetch }: Props) => {
  const { announcementId } = useParams<{ announcementId: string }>();
  const queryClient = useQueryClient();
  const freelancerEmail: string = Session.getSessionObject()?.userEmail ?? '';
  const { mutate, isLoading } = useMutation(Api.addNewQuestion, {
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
        isAnonymous: false,
      }}
      onSubmit={values =>
        mutate({
          announcementId: announcementId!,
          question: { freelancerEmail, ...values },
        })
      }
      validationSchema={validationSchema}
    >
      <Wrapper>
        <FormikCheckbox name="isAnonymous" label="Czy anonimowe" />
        <FormikField name="content" label="Komentarz" type="text" />
        <Button type="submit">Dodaj komentarz</Button>
      </Wrapper>
    </Formik>
  );
});
