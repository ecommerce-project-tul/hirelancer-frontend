import React from 'react';
// eslint-disable-next-line
import { Field, FieldAttributes } from 'formik';
import { Checkbox } from '@mui/material';

type FieldProps = FieldAttributes<any>;

export const FormikCheckbox = ({ label, ...props }: FieldProps) => (
  <Field validateOnBlur validateOnChange {...props}>
    {({
      field, // { name, value, onChange, onBlur }
      form,
      meta: { touched, error },
    }: any) => (
      <Checkbox
        name={props.name}
        type={props.type}
        error={Boolean(error && touched)}
        label={label}
        // onChange={(e) => {console.log(e); field.onChange(e.target.checked);}}
        onClick={() =>
          field.onChange({ target: { ...field, value: !field.value } })
        }
        onBlur={field.onBlur}
        helperText={error && touched && String(error)}
        checked={field.value}
        {...props}
      />
    )}
  </Field>
);
