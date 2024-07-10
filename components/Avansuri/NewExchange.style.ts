import styled from "styled-components";

export const ExchangeTitle = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  font-size: 18px;
  font-weight: bold;

  margin-top: 16px;
  padding: 12px 0;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);

  @media screen and (max-width: 600px) {
    font-size: 14px;
  }
`;

export const ExchangeFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
`;

export const ExchangeResult = styled.p`
  font-size: 18px;
  font-weight: bold;

  @media screen and (max-width: 600px) {
    font-size: 14px;
  }
`;