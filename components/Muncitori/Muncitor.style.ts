import { MdDelete } from "react-icons/md";
import { GoPlus } from "react-icons/go";
import styled from "styled-components";
import { fadeIn } from "../Avansuri/Avans.style";

export const MuncitorItem = styled.div<{ editMode: boolean }>`
  padding: ${({ editMode }) => (editMode ? "10px 0" : "12px 0")};
  color: ${({ theme }) => theme.textPrimary};
  font-size: 18px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);

  opacity: 0;
  transform: translateX(-3px);
  animation: ${fadeIn} 0.4s ease-out forwards;

  &:last-child {
    padding-bottom: 0;
    border: none;
  }

  @media screen and (max-width: 600px) {
    font-size: 14px;
    padding: ${({ editMode }) => (editMode ? "8px 0" : "10px 0")};
  }
`;

export const MuncitorTitle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  gap: 10px;
  color: ${({ theme }) => theme.lightBlue};
`;

export const MuncitorData = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-bottom: 4px;
`;

export const MuncitorTotal = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  font-weight: bold;
`;

export const MuncitorName = styled.div`
  font-size: 18px;
  text-transform: capitalize;
  font-weight: bold;
  color: ${({ theme }) => theme.textPrimary};

  @media screen and (max-width: 600px) {
    font-size: 14px;
  }
`;

export const MuncitorControl = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: normal;
`;

export const MuncitorOptionsIcon = styled.div`
  display: flex;
  align-items: center;
  margin-left: 10px;
  padding-left: 4px;
`;

export const MuncitorIcon = styled.div`
  display: flex;
  align-items: center;
  padding-left: 4px;
  border-left: 1px solid rgba(0, 0, 0, 0.1);
  color: ${({ theme }) => theme.textPrimary};
  cursor: pointer;

  &:hover {
    color: ${({ theme }) => theme.lightRed};
  }
`;

export const NewSalaryIcon = styled.div`
  margin-top: 4px;

  & * {
    font-size: 26px;
  }

  &:hover {
    color: ${({ theme }) => theme.lightBlue};
  }

  @media screen and (max-width: 600px) {
    & * {
      font-size: 22px;
    }
  }
`;

export const MuncitorDelete = styled(MdDelete)`
  font-size: 27px;

  @media screen and (max-width: 600px) {
    font-size: 24px;
  }
`;

export const MuncitorAdd = styled(GoPlus)`
  font-size: 27px;

  @media screen and (max-width: 600px) {
    font-size: 24px;
  }
`;

export const SalariiList = styled.div`
  margin-top: 10px;
`;
