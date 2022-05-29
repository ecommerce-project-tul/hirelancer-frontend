import React, { memo, useState } from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import _ from 'lodash';
import { createAvatar } from '@dicebear/avatars';
import * as style from '@dicebear/croodles-neutral';
import Api from 'Api/api';
import { User } from 'Api/Types/User';
import Session from 'Api/session';
import { BubblesPageWrapper } from 'Components/BubblesPageWrapper';
import { StyledTitle } from 'Components/StyledTitle';
import { Button } from 'Components/Button';
import {
  Header,
  UserDescription,
  LinksContainer,
  FlexContainer,
  ReviewsWrapper,
  Review,
} from './styled';
import { EditModal } from './EditModal';

export const UserPage = memo(() => {
  const { email } = useParams<{ email: string }>();
  const [ editing, setEditing ] = useState<'githubLink' | 'linkedInLink' | 'description' | 'photo' | null>(null);

  const { isLoading, error, data } = useQuery<User, { message: string }>(
    ['user', email],
    () => Api.getUser(email!),
  );

  if (error)
    return <StyledTitle>{'Wystąpił błąd: ' + error.message}</StyledTitle>;

  if (isLoading) return <StyledTitle>Ładowanie...</StyledTitle>;
  console.log(data);

  const avatar = createAvatar(style, {
    seed: data?.id,
    dataUri: true,
  });

  const checkIsMine = () => {
    const token = Session.getSessionObject();
    if (!token) return false;
    if (!data) return false;

    return token.userEmail === data.email;
  };
  const isMine = checkIsMine();

  const hasReviews = () => {
    if (!data?.reviews) return false;
    return data.reviews.length! > 0;
  };

  return (
    <>
      <Header>
        <div>
          <h1>
            {data?.firstName} {data?.lastName}
          </h1>
          <h2>{data?.offers?.join(', ')}</h2>
        </div>
        <img src={data?.photo ?? avatar} />
      </Header>
      <EditModal
        edited={editing}
        email={email!}
        onClose={() => setEditing(null)}
       />
      <BubblesPageWrapper>
        <FlexContainer>
          <UserDescription>{data?.description}
            {isMine && <Button onClick={() => setEditing('description')}>Edytuj opis</Button>}
            {isMine && <Button onClick={() => setEditing('photo')}>Edytuj zdjęcie</Button>}
          </UserDescription>
          <LinksContainer>
            <span>
              Github:{' '}
              {data?.githubLink ? (
                <a href={data?.githubLink}>{_.last(data?.githubLink.split('/'))}</a>
              ) : (
                '-'
              )}
            </span>
            {isMine && <Button onClick={() => setEditing('githubLink')}>Edytuj</Button>}
            <span>
              Linkedin:{' '}
              {data?.linkedInLink ? (
                <a target="_blank" href={data?.linkedInLink}>{_.last(data?.linkedInLink.split('/'))}</a>
              ) : (
                '-'
              )}
            </span>
            {isMine && <Button onClick={() => setEditing('linkedInLink')}>Edytuj</Button>}
          </LinksContainer>
        </FlexContainer>
        {hasReviews() && (
          <ReviewsWrapper>
            {data?.reviews.map(({ client, description, score }) => (
              <Review>
                <p>{description}</p>
                <h3>{`${client} ${score}/5`}</h3>
              </Review>
            ))}
          </ReviewsWrapper>
        )}
      </BubblesPageWrapper>
    </>
  );
});
