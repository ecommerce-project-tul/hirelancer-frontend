import React, { useRef, useEffect, useState, memo, ReactNode } from 'react';
import Tooltip from '@mui/material/Tooltip';

import styled from 'styled-components';

const StyledPopper = styled.div`
  margin: 0.2rem;
  font-size: 1rem;
`;

interface Props {
  children: ReactNode | string;
  title: string | NonNullable<React.ReactNode>;
  className?: string;
}

export const OverflowTooltip = memo(({ children, title, ...props }: Props) => {
  const textElementRef = useRef<HTMLDivElement | null>(null);
  const [isOverflow, setIsOverflow] = useState(false);

  const compareSize = () => {
    if (!textElementRef.current) return;
    setIsOverflow(
      textElementRef.current.scrollWidth > textElementRef.current.clientWidth,
    );
  };

  useEffect(() => {
    compareSize();
    window.addEventListener('resize', compareSize);
  }, []);

  useEffect(
    () => () => {
      window.removeEventListener('resize', compareSize);
    },
    [],
  );

  return (
    <Tooltip
      title={<StyledPopper>{title}</StyledPopper>}
      disableHoverListener={!isOverflow}
      {...props}
    >
      <div
        ref={textElementRef}
        style={{
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        }}
      >
        {children}
      </div>
    </Tooltip>
  );
});
