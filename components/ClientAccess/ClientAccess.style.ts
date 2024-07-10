import styled from 'styled-components';

export const AccessControl = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: nowrap;
  margin: 10px 0 20px;

  @media screen and (max-width: 500px) {
    flex-wrap: wrap;
  }
`;

export const AccessField = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 18px;
  margin-top: 10px;
  margin-right: 10px;
  padding-right: 10px;
  cursor: pointer;
  user-select: none;

  &:not(:last-child) {
    border-right: 1px solid rgba(0, 0, 0, 0.1);
  }

  @media screen and (max-width: 600px) {
    font-size: 14px;
  }

  @media screen and (max-width: 500px) {
    &:nth-child(2) {
      border-right: none;
    }
  }
`;

export const AccessShare = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  align-items: center;
`;
