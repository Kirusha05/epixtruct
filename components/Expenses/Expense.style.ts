import { MdDelete, MdEdit } from 'react-icons/md';
import { HiOutlineDotsVertical } from 'react-icons/hi';

import styled, { keyframes } from 'styled-components';
import { fadeIn } from '../Avansuri/Avans.style';

export const ExpenseItem = styled.div<{ editMode?: boolean; onTop?: boolean }>`
  padding: 8px 0;
  font-size: 18px;
  color: ${({ theme }) => theme.textPrimary};
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  z-index: ${({ onTop }) => (onTop ? '45' : 'initial')};

  opacity: 0;
  transform: translateX(-3px);
  animation: ${fadeIn} 0.4s ease-out forwards;

  &:last-child {
    border-bottom: none;
    margin-bottom: -10px;
  }

  @media screen and (max-width: 600px) {
    font-size: 14px;
    flex-direction: column;
    gap: 6px;
    padding: 12px 0;
  }
`;

export const ExpenseField = styled.div`
  flex: 2;

  & > p {
    min-width: max-content;
  }

  &:nth-child(2) {
    flex: 1;
  }

  @media screen and (max-width: 600px) {
    flex: initial;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    width: 100%;
  }
`;

export const ExpenseName = styled.h2`
  font-size: inherit;
  color: ${({ theme }) => theme.lightBlue};
`;

export const ExpenseHighlight = styled.span<{ color: 'red' | 'blue' }>`
  font-weight: bold;
  color: ${({ theme, color }) =>
    color === 'red' ? theme.lightRed : theme.lightBlue};
`;

export const ExpenseMain = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;

  @media screen and (max-width: 600px) {
    width: 100%;
    justify-content: space-between;
  }
`;

export const ExpenseControl = styled.div`
  display: flex;
  align-items: center;
  position: relative;
`;

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

export const ExpenseOptionsModal = styled.div`
  position: absolute;
  top: -50%;
  right: 22px;
  border-radius: 1rem;
  padding: 0.5rem 1.2rem;
  z-index: 100;
  display: flex;
  gap: 10px;
  transform-origin: right;

  background-color: ${({ theme }) => theme.bgPrimary};
  animation: ${growAnimation} 0.2s ease-out forwards;

  @media screen and (max-width: 600px) {
    top: -50%;
    background-color: transparent;
    padding: 0.5rem;
    right: 20px;
  }
`;

export const InvisibleBackdrop = styled.div`
  background-color: transparent;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 40;
`;

export const ExpenseOptionsIcon = styled.div`
  display: flex;
  align-items: center;
  margin-left: 10px;
  padding-left: 4px;
`;

export const ExpenseDelete = styled(MdDelete)`
  font-size: 27px;
  cursor: pointer;

  &:hover {
    color: ${({ theme }) => theme.lightRed};
  }

  @media screen and (max-width: 600px) {
    font-size: 20px;
  }
`;

export const ExpenseEdit = styled(MdEdit)`
  font-size: 27px;
  cursor: pointer;

  &:hover {
    color: ${({ theme }) => theme.lightBlue};
  }

  @media screen and (max-width: 600px) {
    font-size: 20px;
  }
`;
