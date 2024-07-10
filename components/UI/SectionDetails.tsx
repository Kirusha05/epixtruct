import styled, { css } from 'styled-components';

export const DetailsBox = styled.div<{ insideSectionHeader?: boolean }>`
  ${({ insideSectionHeader }) =>
    !insideSectionHeader &&
    css`
      margin-top: 10px;
      padding-bottom: 10px;
      border-bottom: 1px solid rgba(0, 0, 0, 0.1);
      justify-content: center;
      width: 100%;
    `};

  display: flex;
  align-items: center;
  font-size: 18px;

  @media screen and (max-width: 600px) {
    font-size: 14px;
  }
`;

export const DetailItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  position: relative;
  min-width: max-content;
  color: ${({ theme }) => theme.textSecondary};

  &:not(:first-child) {
    margin-left: 10px;
  }

  &:not(:last-child) {
    border-right: 1px solid rgba(0, 0, 0, 0.1);
    padding-right: 10px;
  }
`;

export const DetailsTitle = styled.p`
  @media screen and (max-width: 600px) {
    display: none;
  }
`;