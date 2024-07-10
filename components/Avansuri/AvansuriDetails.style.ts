import styled from 'styled-components';

export const DetailsBox = styled.div`
  margin: 10px 0;
  padding-bottom: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  font-size: 18px;
  user-select: none;

  @media screen and (max-width: 600px) {
    font-size: 14px;
  }
`;

export const DetailItem = styled.div`
  margin-left: 10px;
  user-select: none;

  &:not(:last-child) {
    border-right: 1px solid rgba(0, 0, 0, 0.1);
    padding-right: 10px;
  }
`;