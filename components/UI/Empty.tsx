import styled from 'styled-components';

const Empty = styled.p<{
  mt?: boolean;
  mb?: boolean;
  wFull?: boolean;
  customMb?: number;
}>`
  font-size: 18px;
  margin-top: ${({ mt }) => (mt ? '10px' : '0')};
  margin-bottom: ${({ mb }) => (mb ? '10px' : '0')};
  margin-bottom: ${({ customMb }) => (customMb ? `${customMb}px` : '0')};
  width: ${({ wFull }) => (wFull ? '100%' : 'auto')};

  @media screen and (max-width: 600px) {
    font-size: 14px;
  }
`;

export default Empty;
