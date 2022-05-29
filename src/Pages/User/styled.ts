import styled from 'styled-components';

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 1.6rem;

  h1 {
    font-family: 'Poiret One';
    font-style: normal;
    font-weight: 400;
    font-size: 7.2rem;
    line-height: 7.4rem;
  }

  h2 {
    font-family: 'Poiret One';
    font-style: normal;
    font-weight: 400;
    font-size: 4.8rem;
    line-height: 2rem;
    letter-spacing: 0.01rem;
    color: #79747e;
  }

  > img {
    height: 20rem;
    width: 20rem;
    filter: drop-shadow(0rem 0.4rem 0.4rem rgba(0, 0, 0, 0.25));
    border-radius: 100%;
  }
`;

export const UserDescription = styled.p`
  font-family: 'Poiret One';
  font-style: normal;
  font-weight: 400;
  font-size: 2.4rem;
  line-height: 2.8rem;

  /* or 119% */
  letter-spacing: 0.01rem;

  color: #000000;

  button {
    margin: 0.8rem;
  }
`;

export const LinksContainer = styled.div`
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
  align-items: start;
  height: fit-content;

  a {
    color: #002299;

    :hover {
      text-decoration: underline;
    }
  }
`;

export const FlexContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const ReviewsWrapper = styled.div`
  text-align: left;
  background-color: #fff;
  border-radius: 1rem;
  padding: 4.8rem;
  margin-top: 4.8rem;
  box-shadow: 0rem 0.4rem 0.4rem rgba(0, 0, 0, 0.25);
  display: grid;
  grid-gap: 2.8rem;
`;

export const Review = styled.div`
  p {
    font-family: 'Poiret One';
    font-style: normal;
    font-weight: 400;
    font-size: 3.6rem;
    line-height: 2rem;
    letter-spacing: 0.01rem;
    color: #000000;
  }

  h3 {
    font-family: 'Poiret One';
    font-style: normal;
    font-weight: 400;
    font-size: 2.4rem;
    line-height: 2rem;
    letter-spacing: 0.01rem;
    color: #79747e;
  }
`;
