import { MdDelete } from 'react-icons/md';
import styled from 'styled-components';

export const SalariuItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 6px;

  padding-left: 20px;
  position: relative;

  &:not(:last-child) {
    padding-bottom: 14px;
  }

  &:last-child {
    &::before {
      height: 50%;
    }
    &::after {
      top: 50%;
    }
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 4px;
    width: 2px;
    height: 100%;
    background: ${({ theme }) => theme.lightBlue};
  }

  &::after {
    content: '';
    position: absolute;
    top: 30%;
    left: 4px;
    width: 12px;
    height: 2px;
    transform: translateY(-50%);
    background: ${({ theme }) => theme.lightBlue};
  }

  @media screen and (max-width: 600px) {
    font-size: 14px;

    &:not(:last-child) {
      padding-bottom: 14px;
    }

    &::after {
      top: 10px;
    }

    &:last-child {
      &::before {
        height: 10px;
      }
      &::after {
        top: 10px;
      }
    }
  }
`;

export const SalariuMain = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  justify-content: space-between;
  width: 100%;
`;

export const SalariuControl = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`

export const SalariuBold = styled.span`
  font-weight: bold;
`;
