import React, { memo, useMemo } from 'react';
import _ from 'lodash';
import { Offer as OfferType } from 'Api/Types/Offer';
import { StatisticsWrapper } from './styled';
import { Link } from 'react-router-dom';

interface Props {
  offers: OfferType[];
}

export const Statistics = memo(({ offers }: Props) => {
  const calcAverage = () => {
    const sum = offers.reduce((a, { price }) => a + Number(price), 0);
    return Math.round(sum / offers.length);
  };
  const calcMedian = () => {
    const sorted = offers
      .map(({ price }) => Number(price))
      .sort((a, b) => a - b);
    const middle = Math.floor(sorted.length / 2);

    if (sorted.length % 2 === 0) {
      return (sorted[middle - 1] + sorted[middle]) / 2;
    }

    return sorted[middle];
  };

  const { number, uniqueUsers, average, median } = useMemo(() => {
    return {
      number: offers.length,
      uniqueUsers: _.uniqBy(offers, ({ freelancer }) => freelancer.id).length,
      average: calcAverage(),
      median: calcMedian(),
    };
  }, [offers.length]);

  return (
    <StatisticsWrapper>
      <span>{`Liczba ofert: ${number}`}</span>
      {offers.length > 0 && (
        <>
          <span>{`Średnia wycena: ${average}`}</span>
          <span>{`Mediana wycen: ${median}`}</span>
        </>
      )}
      <span>{`Liczba freelancerów: ${uniqueUsers}`}</span>
    </StatisticsWrapper>
  );
});
