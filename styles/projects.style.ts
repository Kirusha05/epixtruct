import { MdDelete } from 'react-icons/md';
import styled from 'styled-components';

export const ProjectInfo = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;

  & > a {
    flex: 1;
    font-size: 22px;
    font-weight: bold;
    text-decoration: none;
    color: ${({ theme }) => theme.textPrimary};

    &:hover {
      color: ${({ theme }) => theme.lightBlue};
    }

    @media screen and (max-width: 600px) {
      font-size: 18px;
    }
  }
`;

export const ProjectTitle = styled.a`
  flex: 1;
  font-size: 22px;
  font-weight: bold;
  text-decoration: none;
  color: ${({ theme }) => theme.textPrimary};

  &:hover {
    color: ${({ theme }) => theme.lightBlue};
  }

  @media screen and (max-width: 600px) {
    font-size: 18px;
  }
`;

export const ProjectIcon = styled.div`
  display: flex;
  align-items: center;
  margin-left: 10px;
  padding-left: 4px;
  border-left: 1px solid rgba(0, 0, 0, 0.1);
`;

export const ProjectDelete = styled(MdDelete)`
  font-size: 27px;
  cursor: pointer;
  color: ${({ theme }) => theme.textPrimary};

  &:hover {
    color: ${({ theme }) => theme.lightRed};
  }

  @media screen and (max-width: 600px) {
    font-size: 24px;
  }
`;
