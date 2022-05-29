import _ from 'lodash';
import React, { useState, useEffect, memo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: grid;
  justify-content: center;
  align-items: center;
  text-align: center;

  a {
    :hover {
      cursor: pointer;
      text-decoration: underline;
    }
  }
`;

const Rotating3d = styled.div`
  font-size: 30vmin;
  margin: 0.5vmin;
  animation: font-shadow-500 4s alternate infinite ease-in-out;
  width: 100%;
  text-align: center;
  user-select: none;

  @keyframes font-shadow-500 {
    0% {
      text-shadow: ${() => {
        const color = 37;
        let shadows = 'hsl(' + color + ', 100%, 46%) 0em 0em';

        _.times(3, i => {
          shadows += ',hsl(' + color + ', 100%, 46%) ' + i * 0.025 + 'em ' + 0;
        });

        return shadows;
      }};
      transform: rotateY(25deg);
    }
    100% {
      text-shadow: ${() => {
        const color = 37;
        let shadows = 'hsl(' + color + ', 100%, 46%) 0em 0em';

        _.times(3, i => {
          shadows += ',hsl(' + color + ', 100%, 46%) ' + i * -0.025 + 'em ' + 0;
        });

        return shadows;
      }};
      transform: rotateY(-25deg);
    }
  }
`;

export const PaymentSuccess = memo(() => {
  const [counter, setCounter] = useState(15);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setCounter(current => {
        if (current <= 0) navigate('/');
        return current - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Wrapper>
      <Rotating3d>🎉</Rotating3d>
      <h1>Płatność dokonana</h1>
      <h2>Potwierdzenie dostaniesz na maila</h2>
      <p>
        Za {counter} sekund zostaniesz przekierowany na{' '}
        <Link to="/">stronę główną</Link>
      </p>
    </Wrapper>
  );
});
