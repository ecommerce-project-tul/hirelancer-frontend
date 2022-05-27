import React from 'react-dom';

interface Props {
  question: string;
  answer?: string;
  fromWhom?: string;
}

export const QuestionsAndAnserwers = ({
  question,
  answer,
  fromWhom = 'Anonim',
}: Props) => {
  return (
    <>
      <div>Pytanie: {question}</div>
      <div>Od: {fromWhom}</div>
      {answer ? (
        <div>Odpowiedź: {answer}</div>
      ) : (
        <div>Jeszcze nie udzielono odpowiedzi</div>
      )}
      <hr />
    </>
  );
};
