import React from 'react';
import Api from 'Api/api';
import styled from 'styled-components';
import { useMutation, useQueryClient } from 'react-query';
import { Input } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import { FormikField } from 'Components/FormikField';
import { Button } from 'Components/Button';
import { toast } from 'material-react-toastify';
import { validationSchema } from './validation';
import Session from 'Api/session';

const StyledForm = styled(Form)`
  display: flex;
  flex-direction: column;

  > div {
    margin: 1.2rem 2.4rem;
    max-width: ;
  }
`;

export const ModalContent = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { mutate, isLoading } = useMutation(Api.createAnnouncement, {
    onSuccess: data => {
      navigate(`/announcement/${data.anncouncementId}`);
    },
    onError: () => {
      toast.error('Wystąpil bląd!');
    },
    onSettled: () => {
      queryClient.invalidateQueries('create');
    },
  });
  const userEmail = Session.getSessionObject()?.userEmail ?? '';

  return (
    <Formik
      initialValues={{
        title: '',
        description: '',
        startingPrice: 0,
        deadlineDate: new Date(),
        tagName: '',
      }}
      onSubmit={values => mutate({ email: userEmail, ...values })}
      validationSchema={validationSchema}
    >
      {({ errors, touched }) => (
        <StyledForm>
          <FormikField name="title" type="text" label="Tytuł ogłoszenia" />
          <FormikField name="description" type="text" label="Opis ogłoszenia" />
          <FormikField
            name="startingPrice"
            type="number"
            label="Cena początkowa ogłoszenia"
          />
          <FormikField
            name="deadlineDate"
            type="date"
            label="Data wykonania zlecenia"
            InputLabelProps={{
              shrink: true,
            }}
          />
          <FormikField name="tagName" type="text" label="Tagi ogłoszenia" />
          <Button type="submit">Dodaj ogloszenie</Button>
        </StyledForm>
      )}
    </Formik>
  );
};
