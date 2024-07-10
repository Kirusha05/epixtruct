import styled from 'styled-components';
import { Button } from '../UI';

export const Form = styled.form`
  display: flex;
  gap: 10px;
  align-items: center;
`;

export const CursulCurent = styled.p`
  font-weight: bold;
  margin-top: 10px;
  color: ${({ theme }) => theme.textSecondary};
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media screen and (max-width: 600px) {
    text-align: center;
    font-size: 12px;
  }
`;
