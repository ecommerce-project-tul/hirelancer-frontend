import styled from 'styled-components';
import { Form } from 'formik';

export const Wrapper = styled(Form)`
  display: flex;
  flex-direction: row;
  margin-top: 20px;
  align-items: center;

   > * {
    margin-right: 10px;
  }
`;
