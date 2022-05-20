import React, { memo, useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { Socket, io } from 'socket.io-client';
import { config } from 'config/index';
import { TextField } from '@mui/material';
import { useForceUpdate } from 'Hooks/useForceUpdate';
import Session from 'Api/session';
import { Button } from 'Components/Button';
import { BubblesPageWrapper } from 'Components/BubblesPageWrapper';
import { OfferRequest } from './types';
import { Wrapper, NewOfferWrapper } from './styled';

type OfferType = unknown;
type OffersType = OfferType[];

export const AnnouncementBidding = memo(() => {
  const { announcementId } = useParams<{ announcementId: string }>();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [socket, setSocket] = useState<Socket<any, any> | null>(null);
  const [offers, setOffers] = useState<OffersType>([]);
  // const rerender = useForceUpdate();
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const newSocket = io(config.baseUrl, { query: { announcementId } });

    newSocket.on('connect', () => {
      setSocket(newSocket);
    });
    newSocket.on('offers', (newOffers: OffersType) => {
      setOffers(newOffers);
    });
    newSocket.on('offer', (newOffer: OfferType) => {
      console.log('🤡');
      console.log(newOffer);
      setOffers([newOffer, ...offers]);
    });
    newSocket.on('error', (error: unknown) => {
      console.log(error);
    });

    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    setInterval(() => AddOffer(69420), 100);

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

    if (offer !== NaN && offer !== null) AddOffer(offer);
  };

  return (
    <Wrapper>
      <BubblesPageWrapper>
        <NewOfferWrapper>
          <TextField inputRef={inputRef} label="Twoja oferta" />
          <Button onClick={handleClick}>licytuj</Button>
        </NewOfferWrapper>
        <p>{socket != null ? 'git' : 'nie git'}</p>
        <h1>{String(socket?.connected)}</h1>
      </BubblesPageWrapper>
    </Wrapper>
  );
});
