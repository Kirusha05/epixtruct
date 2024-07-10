import styled, { css } from 'styled-components';

export const MuncitoriList = styled.div<{ editMode: boolean }>`
  ${({ editMode }) =>
    editMode &&
    css`
      margin-top: 10px;
      border-top: 1px solid rgba(0, 0, 0, 0.1);
    `}
`;

export const AddMuncitor = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  margin-top: 10px;
  margin-bottom: 12px;
`;
