import React, { useState, memo } from 'react';
import { Formik, Form, Field } from 'formik';
import styled from 'styled-components';
import { useMutation, useQueryClient } from 'react-query';
import Api from 'Api/api';
import { toast } from 'material-react-toastify';
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
	right: 1.6rem;
`;

export const LoginModal = memo(() => {
    const [open, setOpen] = useState(false);
		const queryClient = useQueryClient();
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const { mutate, isLoading } = useMutation(Api.login, {
			onSuccess: data => {
				setOpen(false);
				toast.success('Zalogowano!');
			},
			onError: () => {
				toast.error('Wystąpil bląd!');
			},
			onSettled: () => {
				queryClient.invalidateQueries('login');
			},
		});

    return <>
        <FixedButton onClick={() => setOpen(true)}>Zaloguj</FixedButton>
        <Modal open={open} onClose={() => setOpen(false)}>
            <Formik onSubmit={(form) => mutate(form)} initialValues={{ email: '', password: '' }}>
							<StyledForm>
								<FormikField name="email" type="email" label="email"/>
								<FormikField name="password" type="password" label="hasŁo"/>
								<Button disabled={isLoading} type="submit">Zaloguj</Button>
								</StyledForm>
							</Formik>
        </Modal >
    </>;
});