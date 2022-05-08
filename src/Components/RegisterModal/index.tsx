import React, { useState, memo } from 'react';
import { Formik, Form, Field } from 'formik';
import styled from 'styled-components';
import { useMutation, useQueryClient } from 'react-query';
import Api from 'Api/api';
import { EUserRole } from 'Api/Types/EUserRole';
import { toast } from 'material-react-toastify';
import { Select, InputLabel, MenuItem } from '@mui/material';
import { FormikField } from 'Components/FormikField';
import { Modal } from 'Components/Modal';
import { Button } from 'Components/Button';

const StyledForm = styled(Form)`
  display: flex;
  flex-direction: column;

  > div {
    margin: 2.4rem;
    max-width: 
  }
`;

const FixedButton = styled(Button)`
	margin: 2.4rem;
	position: absolute;
	top: 0;
	left: 0;
`;

export const RegisterModal = memo(() => {
    const [open, setOpen] = useState(false);
		const queryClient = useQueryClient();
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const { mutate, isLoading } = useMutation(Api.register, {
			onSuccess: data => {
				setOpen(false);
				toast.success('Zarejestrowano!');
			},
			onError: () => {
				toast.error('Wystąpil bląd!');
			},
			onSettled: () => {
				queryClient.invalidateQueries('register');
			},
		});

    return <>
        <FixedButton onClick={() => setOpen(true)}>Zarejestruj</FixedButton>
        <Modal open={open} onClose={() => setOpen(false)}>
            <Formik onSubmit={(form) => mutate(form)} initialValues={{ 
							email: '', 
							password: '',
							firstName: '',
							lastName: '',
							role: EUserRole.CLIENT,
						}}>
						{({ values, errors, touched, setFieldValue }) => (
							<StyledForm>
								<FormikField name="email" type="email" label="email"/>
								<FormikField name="password" type="password" label="hasŁo"/>
								<FormikField name="firstName" type="text" label="Imię"/>
								<FormikField name="lastName" type="text" label="Nazwisko"/>
								<Select
								value={values.role}
								label="Rola"
								onChange={e => setFieldValue('role', e.target.value)}
								>
									<MenuItem value={EUserRole.FREELANCER}>Freelancer</MenuItem>
									<MenuItem value={EUserRole.ADMIN}>Admin</MenuItem>
									<MenuItem value={EUserRole.CLIENT}>Klient</MenuItem>
								</Select>
								<Button disabled={isLoading} type="submit">Stwórz konto</Button>
								</StyledForm>
						)}
							</Formik>
        </Modal >
    </>;
});