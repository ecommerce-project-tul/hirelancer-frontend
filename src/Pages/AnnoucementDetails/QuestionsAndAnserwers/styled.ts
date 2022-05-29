import styled from 'styled-components';

export const Wrapper = styled.div`
    border-bottom: .1rem solid black;
    padding: 1.2rem;

    > div:nth-child(1) {
        font-family: 'Poiret One';
        font-style: normal;
        font-weight: 400;
        font-size: 2.4rem;
        line-height: 2.6rem;
        letter-spacing: 0.01rem;
    }

    > div:nth-child(2) {
        font-family: 'Poiret One';
        font-style: normal;
        font-weight: 400;
        font-size: 1.2rem;
        line-height: 1.4rem;
        letter-spacing: 0.01rem;
        margin-top: .2rem;
    }

    > div:nth-child(3) {
        font-family: 'Poiret One';
        font-style: normal;
        font-weight: 400;
        font-size: 2rem;
        line-height: 2.1rem;
        letter-spacing: 0.01rem;
        margin-top: .8rem;
    }

    > button {
        margin-top: .8rem;
    }
`;
