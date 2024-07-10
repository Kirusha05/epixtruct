import styled from 'styled-components';

const TotalPrice = styled.p`
  color: ${({ theme }) => theme.inputLabel};
  font-size: 16px;
  margin: 6px 0;
  flex: 1;

  @media screen and (max-width: 600px) {
    font-size: 14px;
  }
`;

export default TotalPrice;
