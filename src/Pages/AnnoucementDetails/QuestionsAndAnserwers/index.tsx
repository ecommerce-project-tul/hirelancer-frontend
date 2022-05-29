import React, { useState } from 'react';
import { Button } from 'Components/Button';
import { AddAnswer } from 'Components/AddAnswer';
import { Wrapper } from './styled';

interface Props {
  question: string;
  questionId: string;
  answer?: string;
  fromWhom?: string;
  isMine?: boolean;
}

export const QuestionsAndAnserwers = ({
  question,
  questionId,
  answer,
  fromWhom = 'Anonim',
  isMine = false,
}: Props) => {
  const [showAddAnswer, setShowAddAnswer] = useState(false);

  const getAnswer = () => {
    if (answer)
      return <div>Odpowiedź: {answer}</div>;

    if (showAddAnswer) return null;

    if (isMine) 
      return <Button onClick={() => setShowAddAnswer(true)}>Dodaj odpowiedź</Button>;

    return <div>Jeszcze nie udzielono odpowiedzi</div>;
  };

  return (
    <Wrapper>
      <div>Pytanie: {question}</div>
      <div>Od: {fromWhom}</div>
      {getAnswer()}
      {showAddAnswer && <AddAnswer questionId={questionId} onSubmit={() => setShowAddAnswer(false)} />}
      {}
    </Wrapper>
  );
};
