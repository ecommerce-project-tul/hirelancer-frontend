import React from 'react';
import {
  Description,
  Item,
  Label,
  List,
  Title,
  Wrapper,
  TextButton,
} from './styled';

interface Props {
  projectName: string;
  description: string;
  type: string;
  technology: string;
  revenue: string | number;
  id: string;
}

export const JobCard = ({
  projectName,
  description,
  type,
  technology,
  revenue,
  id,
}: Props) => {
  return (
    <Wrapper>
      <Title>{projectName}</Title>
      <Description>{description}</Description>
      <List>
        <Item>
          <Label>Type</Label>
          {type}
        </Item>
        <Item>
          <Label>Technologia</Label>
          {technology}
        </Item>
        <Item>
          <Label>Widelki</Label>
          {revenue}
        </Item>
      </List>
      <a href={`/jobs/${id}`}>
        <TextButton>Zobacz więcej</TextButton>
      </a>
    </Wrapper>
  );
};
