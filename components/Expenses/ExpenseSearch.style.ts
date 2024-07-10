import styled from 'styled-components';

export const SearchContainerForm = styled.form`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  margin-top: 14px;

  @media screen and (max-width: 600px) {
    flex-wrap: wrap;
  }
`;

export const SearchTypeBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 0.5rem;
  width: min-content;
  position: relative;

  box-shadow: 4px 4px 6px rgba(181, 188, 204, 1),
    -3px -3px 10px rgba(255, 255, 255, 1),
    inset 2px 2px 7px rgba(181, 188, 204, 0.1),
    inset -2px -2px 7px rgba(181, 188, 204, 0.1);

  &::before {
    content: '';
    position: absolute;
    height: 70%;
    width: 1px;
    left: 51%;
    background-color: rgba(0, 0, 0, 0.1);
  }

  @media screen and (max-width: 600px) {
    width: 100%;
  }
`;

export const SearchType = styled.button<{ isActive?: boolean }>`
  border: none;
  background: transparent;
  padding: 0.7rem 1rem;
  font-size: 16px;
  cursor: pointer;
  font-weight: bold;
  color: ${({ theme, isActive }) =>
    isActive ? theme.lightBlue : theme.textPrimary};

  @media screen and (max-width: 600px) {
    font-size: 14px;
    width: 100%;
  }
`;

export const SearchActions = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  flex: 1;
  justify-content: space-between;

  @media screen and (max-width: 600px) {
    width: 100%;
  }
`;

export const DateBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  flex: 1;

  @media screen and (max-width: 600px) {
    gap: 10px;
    flex: none;
  }
`;

export const SearchDateText = styled.p`
  font-size: 16px;
  font-weight: bold;
  color: ${({ theme }) => theme.lightBlue};
  width: 90px;
  text-align: center;

  @media screen and (max-width: 600px) {
    font-size: 14px;
    width: 80px;
  }
`;
