import { ButtonBase } from "@mui/material";
import styled from "styled-components";

export const Wrapper = styled.div`
  background: linear-gradient(
      0deg,
      rgba(103, 80, 164, 0.11),
      rgba(103, 80, 164, 0.11)
    ),
    #fffbfe;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 2.8rem;
  padding: 2.4rem;
  display: flex;
  flex-direction: column;
  max-width: 28rem;

  a {
    margin-top: 3.2rem;
    margin-left: auto;
  }
`;

export const Title = styled.h2`
  margin: 0;
  padding: 0;
  font-style: normal;
  font-weight: 400;
  font-size: 2.4rem;
  line-height: 3.2rem;
  margin-bottom: 1.6rem;
`;
export const Description = styled.span`
  font-style: normal;
  font-weight: 400;
  font-size: 1.4rem;
  line-height: 2rem;
`;
export const Label = styled.h3`
  margin: 0;
  padding: 0;
  font-style: normal;
  font-weight: 400;
  font-size: 1.6rem;
  line-height: 2.4rem;
`;
export const List = styled.ul`
  margin: 0;
  padding: 0;
`;
export const Item = styled.li`
  padding: 1.6rem 0;
  display: flex;
  align-items: center;
  grid-template-columns: 1fr 3fr;
  justify-content: space-between;
  border-bottom: 0.1rem black solid;
  font-style: normal;
  font-weight: 400;
  font-size: 1.2rem;
  line-height: 1.6rem;
`;
export const TextButton = styled(ButtonBase)`
  font-style: normal;
  font-weight: 500;
  font-size: 1.4rem;
  line-height: 2rem;
  color: #6750a4;
`;
