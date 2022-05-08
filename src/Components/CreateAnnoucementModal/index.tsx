import React, { useState, memo } from 'react';
import { Modal } from 'Components/Modal';
import { Button } from 'Components/Button';
import { ModalContent } from './ModalContent';

export const CreateAnnoucementModal = memo(() => {
    const [open, setOpen] = useState(false);

    return <>
        <Button onClick={() => setOpen(true)}>Stwórz nowe ogloszenie</Button>
        <Modal open={open} onClose={() => setOpen(false)}>
            <ModalContent />
        </Modal >
    </>;
});