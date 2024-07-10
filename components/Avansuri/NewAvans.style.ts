import styled from 'styled-components';
import { Button } from '../UI';

export const CursulCurent = styled.p`
  font-weight: bold;
  margin-top: 10px;
  color: ${({ theme }) => theme.textSecondary};
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 18px;

  @media screen and (max-width: 600px) {
    text-align: center;
    font-size: 14px;
  }
`;