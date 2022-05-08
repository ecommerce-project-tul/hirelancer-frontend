import styled from 'styled-components';
import { ButtonBase as UnstyledButton } from '@mui/material';

export const Button = styled(UnstyledButton)`
	filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));

	background: #6750A4;
	border-radius: 10rem;

	font-family: 'Poiret One', cursive;
	font-style: normal;
	font-weight: 700;
	font-size: 1.4rem;
	line-height: 2rem;

	display: flex;
	align-items: center;
	text-align: center;
	letter-spacing: 0.01rem;
	color: white;

	padding: 0.8rem 1.6rem;
`;