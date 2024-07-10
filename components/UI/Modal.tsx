import React, { useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { MdClose } from 'react-icons/md';
import styled, { keyframes } from 'styled-components';

const growAnimation = keyframes`
  0% {
    transform: scale(0.3);
  }
  80% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
`;

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  z-index: 40;
  display: flex;
  align-items: center;
  justify-content: center;

  @media screen and (max-width: 600px) {
    align-items: flex-start;
  }
`;

export const ModalBox = styled.div`
  width: 90%;
  max-width: 600px;

  border-radius: 1rem;
  padding: 1rem;
  z-index: 50;
  background-color: ${({ theme }) => theme.bgPrimary};
  position: relative;
  /* animation: ${growAnimation} 0.2s ease-out forwards; */

  @media screen and (max-width: 600px) {
    margin-top: 30px;
  }
`;

export const ModalTitle = styled.p`
  font-size: 20px;
  color: ${({ theme }) => theme.textPrimary};
  font-weight: bold;

  @media screen and (max-width: 600px) {
    font-size: 18px;
  }
`;

export const ModalClose = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  font-size: 26px;
  cursor: pointer;
  border: none;
  background: transparent;

  &:hover {
    color: ${({ theme }) => theme.lightBlue};
  }
`;

export const Backdrop = styled.div`
  background-color: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0%;
  width: 100%;
  height: 100%;
  z-index: 40;
  backdrop-filter: blur(3px);
`;

interface IProps {
  modalTitle: string;
  onClose: () => void;
  children: JSX.Element | JSX.Element[] | boolean | (JSX.Element | boolean)[];
  elementToFocus?: React.RefObject<HTMLInputElement>;
  autofocus?: boolean;
}

const Modal = ({
  modalTitle,
  onClose,
  children,
  elementToFocus,
  autofocus
}: IProps) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!elementToFocus || !elementToFocus.current) return;

    // elementToFocus.current.addEventListener('focus', () => {
    //   setTimeout(() => {
    //     modalRef.current?.scrollIntoView({
    //       block: 'center',
    //       behavior: 'smooth'
    //     });
    //   }, 500);
    // });

    if (autofocus) elementToFocus.current.focus();
  }, [autofocus, elementToFocus]);

  return (
    <>
      {createPortal(
        <ModalOverlay>
          <Backdrop onClick={onClose} />
          <ModalBox ref={modalRef}>
            <ModalTitle>{modalTitle}</ModalTitle>
            <ModalClose onClick={onClose}>
              <MdClose />
            </ModalClose>
            {children}
          </ModalBox>
        </ModalOverlay>,
        document.body
      )}
    </>
  );
};

export default Modal;
