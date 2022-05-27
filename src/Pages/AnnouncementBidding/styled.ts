import styled from 'styled-components';

export const Wrapper = styled.div`
  height: 100%;
`;

export const NewOfferWrapper = styled.div`
  display: flex;
  margin-left: 1.6rem;

  > * {
    margin-left: 1.6rem;
  }

  .MuiInputBase-colorPrimary {
    background: white;
  }
`;
export const OffersWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  justify-content: start;
  grid-gap: 4.8rem;
  margin-top: 4.8rem;
  width: 40vw;
  overflow-y: auto;
`;

export const OfferWrapper = styled.div`
  display: flex;
  flex-direction: column;
  background: #fff;
  border: 0.1rem solid rgba(0, 0, 0, 0.25);
  border-radius: 1.6rem;
  padding: 1.2rem;
  font-family: 'Poiret One';
  font-style: normal;
  font-weight: 400;
  font-size: 1.8rem;
  line-height: 3.8rem;
  letter-spacing: 0.01rem;
  color: #000000;
  max-width: 48rem;
  box-shadow: 0rem 0.4rem 0.4rem rgba(0, 0, 0, 0.25);

  > div {
    margin-top: 0.4rem;
    font-size: 2.4rem;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
`;

export const StatisticsWrapper = styled.div`
  position: sticky;
  top: 1.6rem;
  right: 1.6rem;

  height: fit-content;
  min-width: 28rem;
  max-width: 42rem;
  font-family: 'Poiret One';
  font-style: normal;
  font-weight: 400;
  font-size: 2.4rem;
  line-height: 2rem;
  letter-spacing: 0.01rem;
  color: #000000;
  background: #ffffff;
  box-shadow: 0rem 0.4rem 0.4rem rgba(0, 0, 0, 0.25);
  border-radius: 2.4rem;
  padding: 2.8rem;
  display: grid;
  grid-gap: 2.8rem;
  margin-left: 2.8rem;

  @media (max-width: 570px) {
    position: unset;
    top: unset;
    right: unset;
    margin-left: unset;
    margin: 1.6rem;
    min-width: unset;
    width: calc(100% - 3.2rem);
  }
`;

export const ConnectionStatusWrapper = styled.h2`
  font-family: 'Poiret One';
  padding: 0;
  margin: 1.6rem;
`;

export const ContentWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  @media (max-width: 570px) {
    flex-direction: column-reverse;

    > div:first-of-type {
      display: flex;
      flex-direction: column;
      align-items: center;

      .MuiFormControl-root {
        margin-left: -1.6rem;
      }
    }
  }
`;

export const EndedWrapper = styled.h1`
  font-family: 'Poiret One';
  text-align: center;
  color: #000;
  font-size: 2.4rem;
`;
