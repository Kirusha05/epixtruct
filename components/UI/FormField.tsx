import styled from 'styled-components';

const FormField = styled.div<{ withBottomBorder?: boolean }>`
  display: flex;
  gap: 10px;
  align-items: center;
  border-bottom: ${({ withBottomBorder }) => withBottomBorder ? "1px solid rgba(0, 0, 0, 0.1)" : "none"};
  padding-bottom: ${({ withBottomBorder }) => withBottomBorder ? "10px" : "initial"};

  & > *:nth-child(2) {
    flex: 1 1 70%;
  }

  @media screen and (max-width: 600px) {
    & > *:nth-child(2) {
      flex: 1 1 60%;
    }
  }
`;

export default FormField;
