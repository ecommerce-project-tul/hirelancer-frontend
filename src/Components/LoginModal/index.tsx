import React, { useState, memo, useEffect } from 'react';
import { Formik, Form, Field } from 'formik';
import styled from 'styled-components';
import { useMutation, useQueryClient } from 'react-query';
import Api from 'Api/api';
import { toast } from 'material-react-toastify';
import { FormikField } from 'Components/FormikField';
import { Modal } from 'Components/Modal';
import { Button } from 'Components/Button';
import Session from 'Api/session';
import { validationSchema } from './validation';

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
	right: 1.6rem;
`;

export const LoginModal = memo(() => {
	const [open, setOpen] = useState(false);
	const [logged, setLogged] = useState(false);

	useEffect(() => {
		const token = Session.getSessionToken();
		if (token) {
			setLogged(true);
		} else {
			setLogged(false);
		}
	}, []);

	const queryClient = useQueryClient();
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const { mutate, isLoading } = useMutation(Api.login, {
		onSuccess: data => {
			setOpen(false);
			setLogged(true);
			toast.success('Zalogowano!');
			location.reload();
		},
		onError: () => {
			toast.error('Wystąpil bląd!');
		},
		onSettled: () => {
			queryClient.invalidateQueries('login');
		},
	});

	const logout = () => {
		Session.clearSession();
		setLogged(false);
		location.reload();
	};

	return <>
		{
			!logged ?
				(
					<>
						<FixedButton onClick={() => setOpen(true)}>Zaloguj</FixedButton>
						<Modal open={open} onClose={() => setOpen(false)}>
							<Formik onSubmit={(form) => mutate(form)} initialValues={{ email: '', password: '' }} validationSchema={validationSchema}>
								<StyledForm>
									<FormikField name="email" type="email" label="email" />
									<FormikField name="password" type="password" label="hasŁo" />
									<Button disabled={isLoading} type="submit">Zaloguj</Button>
								</StyledForm>
							</Formik>
						</Modal >
					</>
				) :
				(
					<>
						<FixedButton onClick={() => logout()}>Wyloguj</FixedButton>
					</>
				)
		}
	</>;
});