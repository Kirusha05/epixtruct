import { MdAdd, MdDelete } from 'react-icons/md';
import { AiOutlineSwap } from 'react-icons/ai';
import styled from 'styled-components';
import { HiOutlineDotsVertical } from 'react-icons/hi';
import { css } from 'styled-components';

export const AddIcon = styled(MdAdd)`
  font-size: 26px;
  color: ${({ theme }) => theme.inputLabel};

  &:hover {
    color: ${({ theme }) => theme.lightBlue};
  }

  @media screen and (max-width: 600px) {
    font-size: 22px;
  }
`;

export const ExchangeIcon = styled(AiOutlineSwap)`
  font-size: 26px;
  color: ${({ theme }) => theme.inputLabel};

  &:hover {
    color: ${({ theme }) => theme.lightBlue};
  }

  @media screen and (max-width: 600px) {
    font-size: 20px;
  }
`;

export const ItemDots = styled(HiOutlineDotsVertical)`
  font-size: 26px;
  cursor: pointer;

  &:hover {
    color: ${({ theme }) => theme.lightBlue};
  }

  @media screen and (max-width: 600px) {
    font-size: 24px;
  }
`;

export const ItemOptions = styled.div<{ cornerFloating?: boolean }>`
  display: flex;
  align-items: center;
  padding-left: 4px;
  border-left: 1px solid rgba(0, 0, 0, 0.1);

  @media screen and (max-width: 600px) {
    ${({ cornerFloating }) =>
      cornerFloating &&
      css`
        position: absolute;
        top: -2px;
        right: 0;
      `}
  }
`;

export const ItemDeleteIcon = styled(MdDelete)`
  font-size: 27px;
  cursor: pointer;

  &:hover {
    color: ${({ theme }) => theme.lightRed};
  }

  @media screen and (max-width: 600px) {
    font-size: 24px;
  }
`;
