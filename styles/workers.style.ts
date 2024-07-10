import styled from "styled-components";

export const Name = styled.p`
  text-transform: capitalize;
  font-weight: bold;
  font-size: 16px;

  @media screen and (max-width: 600px) {
    font-size: 14px;
  }
`;

export const FlexData = styled.div`
  margin-top: 10px;
  display: flex;
  align-items: center;
  gap: 8px;

  flex-wrap: wrap;

  @media screen and (max-width: 600px) {
    font-size: 14px;
  }
`;

export const StatName = styled.span<{ isRed?: boolean }>`
  padding: 3px 10px;
  background-color: ${({ theme, isRed }) => isRed ? theme.lightRed : theme.lightBlue};
  border-radius: 5px;
  color: white;
  font-weight: bold;
  font-size: 16px;
  text-transform: capitalize;

  @media screen and (max-width: 600px) {
    font-size: 14px;
  }
`;
