import React from 'react';
import { Wrapper, ContentWrapper, Bubbles } from './styled';

interface Props {
    children: React.ReactNode;
}

export const BubblesPageWrapper = ({ children }: Props) => {
    return (
        <Wrapper>
            <Bubbles />
            <ContentWrapper>
                {children}
            </ContentWrapper>
        </Wrapper>
    );
};
