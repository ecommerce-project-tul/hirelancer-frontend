import React from 'react';
import { Field } from 'formik';
import { Input } from '@mui/material';

interface Props {
  name: string;
  type: string;
}

export const FormikField = (props: Props) => (
  <Input inputComponent={Field} inputProps={props} />
);
