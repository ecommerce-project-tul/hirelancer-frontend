import React from 'react';
// eslint-disable-next-line
import { Field, FieldAttributes } from 'formik';
import { TextField } from '@mui/material';

type FieldProps = FieldAttributes<any>;

export const FormikField = ({ label, ...props }: FieldProps) => (
  <Field
    validateOnBlur
    validateOnChange
    {...props}
  >
    {({
      field, // { name, value, onChange, onBlur }
      form,
      meta: { touched, error } }: any) => (
      <TextField
        name={props.name}
        type={props.type}
        error={
          Boolean(error && touched)
        }
        label={label}
        onChange={field.onChange}
        onBlur={field.onBlur}
        helperText={
          error &&
          touched &&
          String(error)
        }
      />
    )}
  </Field>
);
