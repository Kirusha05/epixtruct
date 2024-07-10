import styled from 'styled-components';

export const LoginTitle = styled.h2`
  font-size: 22px;

  @media screen and (max-width: 600px) {
    font-size: 18px;
  }
`;

export const LoginLabel = styled.label`
  display: block;
  color: ${({ theme }) => theme.inputLabel};
  font-size: 18px;
  font-weight: bold;

  @media screen and (max-width: 600px) {
    font-size: 14px;
  }
`;

export const ButtonWrap = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-end;
  margin-top: 10px;
`;

export const LoginMessage = styled.p<{ isError?: boolean }>`
  font-size: 16px;
  font-weight: bold;
  color: ${({ theme, isError }) =>
    isError ? theme.lightRed : theme.darkGreen};

  @media screen and (max-width: 600px) {
    font-size: 12px;
  }
`;
