import { useQuery } from 'react-query';
import styled from 'styled-components';
import { Announcement } from 'Api/Types/Announcement';
import { useParams } from 'react-router-dom';
import Api from 'Api/api';
import { StyledTitle } from 'Components/StyledTitle';
import { Wrapper } from 'Components/BubblesPageWrapper/styled';
import { Button } from 'Components/Button';
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

export const AnnoucementDetails = () => {
  const { annoucementId } = useParams<{ annoucementId: string }>();

  const { isLoading, error, data } = useQuery<
    Announcement,
    { message: string }
  >(['repoData', annoucementId], () => Api.getAnnoucementById(annoucementId!));

  if (error)
    return <StyledTitle>{'Wystąpił błąd: ' + error.message}</StyledTitle>;

  if (isLoading) return <StyledTitle>Ładowanie...</StyledTitle>;

  return (
    <>
      <LeftSideHeader>{data?.title}</LeftSideHeader>
      <BubblesPageWrapper>
        <AnnoucementDescription>{data?.description}</AnnoucementDescription>

        <Button color="primary">Podaj wycenę</Button>
        <QuestionsAndAnserwersWrapper>
          {data?.messages?.map(message => (
            <QuestionsAndAnserwers
              fromWhom={String(message.isAnonymous)}
              question={message.content}
              answer={message.message?.content}
            />
          ))}
        </QuestionsAndAnserwersWrapper>
      </BubblesPageWrapper>
    </>
  );
};
