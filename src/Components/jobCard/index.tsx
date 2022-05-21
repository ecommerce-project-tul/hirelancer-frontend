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
import Chip from '@mui/material/Chip';

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
          <Label>Typ</Label>
          {type.split(',').map(tag => (
            <Chip label={tag}></Chip>
          ))}
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
      <a href={`/announcement/${id}`}>
        <TextButton>Zobacz więcej</TextButton>
      </a>
    </Wrapper>
  );
};
