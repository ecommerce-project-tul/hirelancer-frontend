import React from 'react';
import styled from 'styled-components';
import { Formik, Form, Field } from 'formik';
import { useMutation, useQueryClient } from 'react-query';
import { toast } from 'material-react-toastify';
import { FormikField } from 'Components/FormikField';
import { Button } from 'Components/Button';
import { Modal } from 'Components/Modal';
import Api from 'Api/api';

const StyledForm = styled(Form)`
  display: flex;
  flex-direction: column;

  > div {
    margin: 2.4rem;
    max-width: 
  }
`;

interface Props {
    edited: 'githubLink' | 'linkedInLink' | 'description' | 'photo' | null;
    email: string;
    onClose(): void;
}

export const EditModal = ({ edited, email, onClose }: Props) => {
    const queryClient = useQueryClient();
    const { mutate, isLoading } = useMutation(Api.updateUser, {
        onSuccess: data => {
            onClose();
            toast.success('Zalogowano!');
            location.reload();
        },
        onError: () => {
            toast.error('Wystąpil bląd!');
        },
        onSettled: () => {
            queryClient.invalidateQueries('user');
        },
    });

    const getLabel = () => {
        switch (edited) {
            case 'githubLink':
                return 'Github link';
            case 'linkedInLink':
                return 'LinkedIn link';
            case 'description':
                return 'Opis';
            case 'photo':
                return 'Zdjęcie';
            default:
                return '';
        }
    };

    return <Modal open={edited !== null} onClose={onClose}>
        <Formik onSubmit={(form) => mutate({ email, [edited!]: form.value })} initialValues={{ value: '' }} >
            <StyledForm>
                <FormikField name="value" label={getLabel()} type="text" />
                <Button disabled={isLoading} type="submit">Zapisz</Button>
            </StyledForm>
        </Formik>
    </Modal >;
};
