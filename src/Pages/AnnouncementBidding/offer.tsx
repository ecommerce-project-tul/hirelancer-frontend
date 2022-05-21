import React, { memo } from 'react';
import { Offer as OfferType } from 'Api/Types/Offer';
import { OfferWrapper } from './styled';
import { Link } from 'react-router-dom';
import { Button } from 'Components/Button';

interface Props {
  offer: OfferType;
  onAccept(id: string): void;
  isOwner: boolean;
}

export const Offer = memo(
  ({ offer: { freelancer, price, id }, onAccept, isOwner }: Props) => {
    return (
      <OfferWrapper>
        <Link
          to={`/user/${freelancer.email}`}
        >{`${freelancer.firstName} ${freelancer.lastName}`}</Link>
        <div>
          <span>{price} zł</span>
          {isOwner && <Button onClick={() => onAccept(id)}>Zaakceptuj</Button>}
        </div>
      </OfferWrapper>
    );
  },
);
