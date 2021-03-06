import { useQuery } from 'react-query';
import styled from 'styled-components';
import { Announcement } from 'Api/Types/Announcement';
import { useParams, Link } from 'react-router-dom';
import Api from 'Api/api';
import Session from 'Api/session';
import jwt_decode from 'jwt-decode';
import { StyledTitle } from 'Components/StyledTitle';
import { Wrapper } from 'Components/BubblesPageWrapper/styled';
import { Button } from 'Components/Button';
import { AddComment } from 'Components/AddComment';
import { BubblesPageWrapper } from 'Components/BubblesPageWrapper';
import _ from 'lodash';
import { EMessageType } from 'Api/Types/EMessageType';
import { Message } from 'Api/Types/Message';
import { QuestionsAndAnserwers } from './QuestionsAndAnserwers';

export const LeftSideHeader = styled(StyledTitle)`
  text-align: left;
  margin-left: 2.4rem;
`;

export const AnnoucementDescription = styled.p`
  text-align: left;
  font-family: Poiret One;
  font-size: 1.8rem;
  line-height: 3rem;
`;

export const QuestionsAndAnserwersWrapper = styled.div`
  text-align: left;
  background-color: #fff;
  border-radius: 1rem;
  padding: 1rem;
  margin-top: 1rem;
`;

export const OfferEnded = styled.h3`
  font-family: 'Poiret One';
  font-size: 1.6rem;
`;

export const AnnoucementDetails = () => {
  const { announcementId } = useParams<{ announcementId: string }>();

  const { isLoading, error, data, refetch } = useQuery<
    Announcement,
    { message: string }
  >(['announcementDetails', announcementId], () =>
    Api.getAnnoucementById(announcementId!),
  );

  const isMine = () => {
    const token = Session.getSessionToken();
    if (!token) return false;
    if (!data) return false;

    const { userId } = jwt_decode(token) as { userId: string };
    return userId === data.client.id;
  };

  if (error)
    return <StyledTitle>{'Wystąpił błąd: ' + error.message}</StyledTitle>;

  if (isLoading) return <StyledTitle>Ładowanie...</StyledTitle>;

  return (
    <>
      <LeftSideHeader>{data?.title}</LeftSideHeader>
      <BubblesPageWrapper>
        <AnnoucementDescription>{data?.description}</AnnoucementDescription>

        {isMine() || data?.isActive === true ? (
          <Link to="bidding">
            <Button color="primary">
              {isMine() ? 'Zobacz oferty' : 'Podaj wycenę'}
            </Button>
          </Link>
        ) : (
          <OfferEnded>Oferta zakończona. Dziękujemy za udział ❤️</OfferEnded>
        )}
        <QuestionsAndAnserwersWrapper>
          {data?.messages
            ?.filter(message => message.messageType === EMessageType.QUESTION)
            .map(message => {
              const answer = data.messages.find(
                a =>
                  a.messageType === EMessageType.ANSWER &&
                  a?.parent?.id === message.id,
              );
              return (
                <QuestionsAndAnserwers
                  fromWhom={
                    message.isAnonymous
                      ? 'Anonim'
                      : `${message.user.firstName} ${message.user.lastName}`
                  }
                  question={message?.content}
                  questionId={message.id}
                  answer={answer?.content}
                  isMine={Boolean(isMine)}
                />
              );
            })}
          <AddComment refetch={refetch} />
        </QuestionsAndAnserwersWrapper>
      </BubblesPageWrapper>
    </>
  );
};
