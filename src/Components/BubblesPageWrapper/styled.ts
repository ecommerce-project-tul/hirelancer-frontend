import styled from 'styled-components';
import BubblesUnstyled from '../../Assets/bubbles';

export const Wrapper = styled.div`
  width: 100%;
  min-height: 10rem;
  margin-top: 2.4rem;
`;

export const Bubbles = styled(BubblesUnstyled)`
  width: 100%;
  margin-bottom: -5%;
`;

export const ContentWrapper = styled.div`
  width: 100%;
  background: #d0bcff;
  padding: 2.4rem;
  padding-top: 4rem;
  position: relative;
  z-index: 2;
`;
