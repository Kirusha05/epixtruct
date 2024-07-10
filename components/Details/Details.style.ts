import styled from 'styled-components';

export const DetailContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;

  @media screen and (max-width: 600px) {
    flex-direction: column;
    gap: 10px;
  }
`;

export const DetailName = styled.p`
  font-weight: bold;

  @media screen and (max-width: 600px) {
    width: 100%;
    text-align: center;
  }
`;

export const DetailField = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
  flex: 1;
  flex-wrap: wrap;

  color: ${({ theme }) => theme.textSecondary};
  font-size: 18px;
  user-select: none;

  &:not(:last-child) {
    border-right: 1px solid rgba(0, 0, 0, 0.1);
  }

  @media screen and (max-width: 600px) {
    font-size: 14px;
    gap: 6px;
    flex-direction: row;
    justify-content: center;
    width: 100%;

    &:not(:last-child) {
      border-right: none;
      border-bottom: 1px solid rgba(0, 0, 0, 0.1);
      padding-bottom: 12px;
    }
  }
`;
