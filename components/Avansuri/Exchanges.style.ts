import styled from 'styled-components';

export const ExchangesList = styled.div`
  margin-top: 10px;
`;

export const ExchangeItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 6px;
  position: relative;

  padding-left: 20px;
  position: relative;

  &:not(:last-child) {
    padding-bottom: 12px;
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
      padding-bottom: 12px;
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

export const ExchangeInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const ExchangeRate = styled.span`
  color: ${({ theme }) => theme.lightBlue};
  font-weight: bold;
`;

export const ExchangeControl = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;