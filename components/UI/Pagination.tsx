import { FaChevronRight } from "react-icons/fa";
import styled from "styled-components";

export const PageInfo = styled.div`
  color: ${({ theme }) => theme.inputLabel};
  font-size: 16px;
  text-align: left;
  display: flex;
  align-items: center;
  gap: 8px;

  @media screen and (max-width: 600px) {
    font-size: 14px;
  }
`;

export const PrevArrow = styled(FaChevronRight)`
  font-size: 16px;
  transform: rotate(180deg);
  margin: 1px 4px 0px 2px;

  &:hover {
    color: ${({ theme }) => theme.lightBlue};
  }

  @media screen and (max-width: 600px) {
    margin: 2px 2px 0px 2px;
    font-size: 14px;
  }
`;

export const NextArrow = styled(FaChevronRight)`
  font-size: 16px;
  margin: 1px 2px 0px 4px;

  &:hover {
    color: ${({ theme }) => theme.lightBlue};
  }

  @media screen and (max-width: 600px) {
    margin: 2px 2px 0px 2px;
    font-size: 14px;
  }
`;

export const PageHighlight = styled.span`
  color: ${({ theme }) => theme.lightBlue};
  font-weight: bold;
`;
