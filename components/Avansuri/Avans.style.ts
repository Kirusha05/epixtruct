import { MdDelete } from 'react-icons/md';
import styled, { keyframes } from 'styled-components';

export const fadeIn = keyframes`
  0% {
    opacity: 0;
    transform: translateX(-3px);
  }
  33% {
    transform: translateX(2px);
  }
  66% {
    transform: translateX(-1px);
  }
  100% {
    opacity: 1;
    transform: translateX(0);
  }
`;

export const AvansItem = styled.div<{ editMode: boolean }>`
  padding: ${({ editMode }) => editMode ? '10px 0' : '12px 0'};
  color: ${({ theme }) => theme.textPrimary};
  font-size: 18px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  
  opacity: 0;
  transform: translateX(-3px);
  animation: ${fadeIn} 0.4s ease-out forwards;

  &:last-child {
    padding-bottom: 0;
    border: none;
  }

  @media screen and (max-width: 600px) {
    font-size: 14px;
    padding: ${({ editMode }) => editMode ? '8px 0' : '10px 0'};;
  }
`;

export const AvansHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
`;

export const AvansAmount = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const FlexBox = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const AvansBold = styled.span`
  font-weight: bold;
`;

export const AvansIcon = styled.div`
  display: flex;
  align-items: center;
  padding-left: 4px;
  border-left: 1px solid rgba(0, 0, 0, 0.1);
`;

export const AvansDelete = styled(MdDelete)`
  font-size: 27px;
  cursor: pointer;

  &:hover {
    color: ${({ theme }) => theme.lightRed};
  }

  @media screen and (max-width: 600px) {
    font-size: 24px;
  }
`;