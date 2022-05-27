import React, { memo, useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { Socket, io } from 'socket.io-client';
import { toast } from 'material-react-toastify';
import { config } from 'config/index';
import { TextField } from '@mui/material';
import Api from 'Api/api';
import { useForceUpdate } from 'Hooks/useForceUpdate';
import { Announcement } from 'Api/Types/Announcement';
import { Offer as OfferType } from 'Api/Types/Offer';
import Session from 'Api/session';
import { Button } from 'Components/Button';
import { BubblesPageWrapper } from 'Components/BubblesPageWrapper';
import { OfferRequest } from './types';
import {
  Wrapper,
  NewOfferWrapper,
  OffersWrapper,
  ConnectionStatusWrapper,
  ContentWrapper,
  EndedWrapper,
} from './styled';
import { Offer } from './offer';
import { Statistics } from './statistics';

export const AnnouncementBidding = memo(() => {
  const { announcementId } = useParams<{ announcementId: string }>();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [socket, setSocket] = useState<Socket<any, any> | null>(null);
  const [isOwner, setIsOwner] = useState<boolean>(false);
  const [isActive, setIsActive] = useState<boolean>(false);
  const offers = useRef<OfferType[]>([]);
  const rerender = useForceUpdate();
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const newSocket = io(config.baseUrl, {
      query: { announcementId, token: Session.getSessionToken() },
    });

    newSocket.on('connect', () => {
      setSocket(newSocket);
    });
    newSocket.on('offers', (newOffers: OfferType[]) => {
      offers.current = [...newOffers];
      rerender();
    });
    newSocket.on('offer', (newOffer: OfferType) => {
      offers.current = [newOffer, ...offers.current];
      rerender();
    });
    newSocket.on('error', (error: { message: string }) => {
      toast.error(error.message);
    });
    // eslint-disable-next-line @typescript-eslint/no-shadow
    newSocket.on('owner', ({ isOwner }: { isOwner: boolean }) => {
      setIsOwner(isOwner);
    });
    // eslint-disable-next-line @typescript-eslint/no-shadow
    newSocket.on('active', ({ isActive }: { isActive: boolean }) => {
      setIsActive(isActive);
    });

    return () => {
      newSocket.close();
    };
  }, [setSocket]);

  const AddOffer = (offer: number) => {
    if (!socket) return;
    const token = Session.getSessionToken();
    if (!token) return;

    const body = {
      token,
      announcementId: announcementId,
      price: offer,
    } as OfferRequest;

    socket.emit('addOffer', body);
  };

  const handleClick = () => {
    if (!inputRef.current) return;
    const offer = Number(inputRef.current.value);

    if (!isNaN(offer) && offer !== null) AddOffer(offer);
  };

  const acceptOffer = (id: string) => {
    socket?.emit('acceptOffer', { offerId: id });
  };

  return (
    <Wrapper>
      <ConnectionStatusWrapper>
        Status połączenia: {socket?.connected ? 'połączono' : 'brak połączenia'}
      </ConnectionStatusWrapper>
      <BubblesPageWrapper>
        {isOwner || isActive ? (
          <ContentWrapper>
            <div>
              {!isOwner && (
                <NewOfferWrapper>
                  <TextField inputRef={inputRef} label="Twoja oferta" />
                  <Button onClick={handleClick}>licytuj</Button>
                </NewOfferWrapper>
              )}
              <OffersWrapper>
                {offers.current.map(offer => (
                  <Offer
                    offer={offer}
                    isOwner={isOwner && isActive}
                    onAccept={acceptOffer}
                    key={offer.id}
                  />
                ))}
              </OffersWrapper>
            </div>
            {<Statistics offers={offers.current} />}
          </ContentWrapper>
        ) : (
          <EndedWrapper>Oferta została zakończona</EndedWrapper>
        )}
      </BubblesPageWrapper>
    </Wrapper>
  );
});
