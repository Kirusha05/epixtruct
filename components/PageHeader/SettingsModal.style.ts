import styled, { keyframes } from 'styled-components';

const growAnimation = keyframes`
  0% {
    transform: translate(-50%, -50%) scale(0.3);
  }
  80% {
    transform: translate(-50%, -50%) scale(1.05);
  }
  100% {
    transform: translate(-50%, -50%) scale(1);
  }
`;

export const Modal = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 90%;

  border-radius: 1rem;
  padding: 1rem;
  z-index: 50;
  background-color: ${({ theme }) => theme.bgPrimary};
  animation: ${growAnimation} 0.2s ease-out forwards;

  @media screen and (min-width: 601px) {
    width: fit-content;
  }
`;

export const ModalTitle = styled.p`
  font-size: 20px;
  color: ${({ theme }) => theme.textPrimary};
  font-weight: bold;
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
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  z-index: 40;
  backdrop-filter: blur(3px);
`;
