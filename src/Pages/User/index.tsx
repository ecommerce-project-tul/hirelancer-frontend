import React, { memo } from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { createAvatar } from '@dicebear/avatars';
import * as style from '@dicebear/croodles-neutral';
import Api from 'Api/api';
import { User } from 'Api/Types/User';
import { BubblesPageWrapper } from 'Components/BubblesPageWrapper';
import { StyledTitle } from 'Components/StyledTitle';
import {
  Header,
  UserDescription,
  LinksContainer,
  FlexContainer,
  ReviewsWrapper,
  Review,
} from './styled';

export const UserPage = memo(() => {
  const { email } = useParams<{ email: string }>();

  const { isLoading, error, data } = useQuery<User, { message: string }>(
    ['user', email],
    () => Api.getUser(email!),
  );

  if (error)
    return <StyledTitle>{'Wystąpił błąd: ' + error.message}</StyledTitle>;

  if (isLoading) return <StyledTitle>Ładowanie...</StyledTitle>;

  const avatar = createAvatar(style, {
    seed: data?.id,
    dataUri: true,
  });

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
      <BubblesPageWrapper>
        <FlexContainer>
          <UserDescription>{data?.description}</UserDescription>
          <LinksContainer>
            <span>
              Linkedin:{' '}
              {data?.githubLink ? (
                <a href={data?.githubLink}>data?.githubName</a>
              ) : (
                '-'
              )}
            </span>
            <span>
              Github:{' '}
              {data?.linkedInLink ? (
                <a href={data?.linkedInLink}>data?.linkedInName</a>
              ) : (
                '-'
              )}
            </span>
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
