import styled, { css } from 'styled-components';

export const AvansuriList = styled.div<{ editMode: boolean }>`
  ${({ editMode }) =>
    editMode &&
    css`
      margin-top: 10px;
      border-top: 1px solid rgba(0, 0, 0, 0.1);
    `}
`;

export const AddAvans = styled.div<{ hasTopMargin?: boolean }>`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  margin-top: 10px;
  margin-bottom: 12px;
`;

export const TipText = styled.p<{ alignCenter?: boolean }>`
  color: ${({ theme }) => theme.inputLabel};
  font-size: 14px;
  text-align: ${({ alignCenter }) => (alignCenter ? 'center' : 'left')};
  margin: 10px auto;
  width: 80%;

  @media screen and (max-width: 600px) {
    font-size: 12px;
  }
`;
