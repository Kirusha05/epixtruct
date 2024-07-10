import styled from 'styled-components';

const Label = styled.label`
  color: ${({ theme }) => theme.inputLabel};
  font-size: 18px;
  flex: 1;
  white-space: nowrap;

  @media screen and (max-width: 600px) {
    font-size: 14px;
  }
`;

export default Label;
