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
import { Chip } from 'Components/Chip';

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
  revenue,
  id,
}: Props) => {
  return (
    <Wrapper>
      <Title title={projectName}>{projectName}</Title>
      <Description>{description}</Description>
      <List>
        <Item>
          <Label>Tagi</Label>
          {type.split(',').map(tag => (
            <Chip label={tag}></Chip>
          ))}
        </Item>
        <Item>
          <Label>Cena maksymalna</Label>
          {revenue} PLN
        </Item>
      </List>
      <a href={`/announcement/${id}`}>
        <TextButton>Zobacz więcej</TextButton>
      </a>
    </Wrapper>
  );
};
