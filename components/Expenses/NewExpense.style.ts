import styled from "styled-components";

export const HasQuantityBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  font-size: 18px;
  margin: 5px 0;
  user-select: none;

  @media screen and (max-width: 600px) {
    font-size: 14px;
  }
`;

export const QuantityType = styled.span<{ isActive: boolean }>`
  color: ${({ theme, isActive }) => isActive ? theme.lightBlue : theme.inputLabel};
  font-weight: bold;
`;