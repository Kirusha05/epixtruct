import styled from 'styled-components';

const Form = styled.form<{ hasBottomBorder?: boolean; mt?: number }>`
  display: flex;
  flex-direction: column;
  margin-top: ${({ mt }) => (mt ? `${mt}px` : '20px')};
  gap: 10px;
  border-bottom: ${({ hasBottomBorder: borders }) =>
    borders ? '1px solid rgba(0, 0, 0, 0.1);' : 'none'};
  padding-bottom: ${({ hasBottomBorder: borders }) => (borders ? '20px' : '0')};
`;

export default Form;
