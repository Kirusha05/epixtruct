import styled from 'styled-components';
import { BiSearch } from 'react-icons/bi';

export const ExpensesList = styled.div`
  margin-top: 10px;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  transition: 0.2s ease-out;
`;

export const AddExpense = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  margin-top: 10px;
  margin-bottom: 14px;
`;

export const ExpenseControls = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`;

export const SearchIcon = styled(BiSearch)`
  font-size: 20px;
  margin: 2px 0px 0px 3px;
  color: ${({ theme }) => theme.inputLabel};

  &:hover {
    color: ${({ theme }) => theme.lightBlue};
  }

  @media screen and (max-width: 600px) {
    margin: 2px 2px 0px 2px;
    font-size: 18px;
  }
`;

export const SearchBtnText = styled.span<{ isSearching?: boolean }>`
  color: inherit;

  @media screen and (max-width: 600px) {
    display: ${({ isSearching }) => isSearching ? "block" : "none"};
  }
`;