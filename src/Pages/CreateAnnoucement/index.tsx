import React from 'react';
import Api from 'Api/api';
import { useMutation, useQueryClient } from 'react-query';
import { Button, Input } from '@mui/material';
import { Formik, Form, Field } from 'formik';
import { FormikField } from 'Components/FormikField';
import { validationSchema } from './validation';

export const CreateAnnoucement = () => {
  const queryClient = useQueryClient();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { mutate, isLoading } = useMutation(Api.createAnnoucement, {
    onSuccess: data => {
      console.log(data);
      const message = 'success';
      alert(message);
    },
    onError: () => {
      alert('there was an error');
    },
    onSettled: () => {
      queryClient.invalidateQueries('create');
    },
  });

  return (
    <Formik
      initialValues={{
        email: '',
        description: '',
        startingPrice: 0,
        deadlineDate: new Date(),
        tagName: '',
      }}
      onSubmit={values => mutate(values)}
      validationSchema={validationSchema}
    >
      {({ errors, touched }) => (
        <Form>
          <Input
            inputComponent={Field}
            inputProps={{ name: 'email', type: 'email' }}
          />
          <FormikField name="email" type="email" />
          {errors.email && touched.email && <div>{errors.email}</div>}
          <Field name="description" type="text" />
          {errors.description && touched.description && (
            <div>{errors.description}</div>
          )}
          <Field name="startingPrice" type="number" />
          {errors.startingPrice && touched.startingPrice && (
            <div>{errors.startingPrice}</div>
          )}
          <Field name="deadlineDate" type="date" />
          {errors.deadlineDate && touched.deadlineDate && (
            <div>{errors.deadlineDate as string}</div>
          )}
          <Field name="tagName" type="email" />
          {errors.tagName && touched.tagName && <div>{errors.tagName}</div>}
          <Button type="submit">submit</Button>
        </Form>
      )}
    </Formik>
  );
};
