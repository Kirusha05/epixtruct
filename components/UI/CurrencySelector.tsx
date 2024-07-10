import styled from "styled-components";
import Button from "./Button";

export const CurrencySelect = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 18px;
  color: ${({ theme }) => theme.textSecondary};

  & > * {
    flex: 1;
  }

  @media screen and (max-width: 600px) {
    font-size: 14px;
  }
`;

export const CurrencyButton = styled(Button)<{ selected?: boolean }>`
  padding: 0 16px;
  font-weight: bold;
  justify-content: center;
  color: ${({ theme, selected }) =>
    selected ? theme.lightBlue : theme.textPrimary};
`;
