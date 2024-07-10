import styled from 'styled-components';

export const Header = styled.header`
  padding-bottom: 10px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
`;

export const Title = styled.h2`
  font-size: 22px;
  user-select: none;
  flex: 1;

  @media screen and (max-width: 600px) {
    font-size: 18px;
  }
`;

export const TitleIcon = styled.div`
  font-size: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  &:hover {
    color: ${({ theme }) => theme.lightBlue};
  }

  @media screen and (max-width: 600px) {
    font-size: 22px;
  }
`;

export const TitleForm = styled.form`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
`;
