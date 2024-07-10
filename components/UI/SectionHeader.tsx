import styled from 'styled-components';
import { FaChevronRight } from 'react-icons/fa';

const SectionTitle = styled.div`
  font-size: 20px;
  user-select: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media screen and (max-width: 600px) {
    font-size: 14px;
  }
`;

const SectionTitleMain = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: bold;
`;

const SectionArrow = styled(FaChevronRight)<{ open: boolean }>`
  font-size: 22px;
  transition: 0.15s ease-out;
  transform: ${(props) => (props.open ? 'rotate(90deg)' : 'none')};

  @media screen and (max-width: 600px) {
    font-size: 16px;
  }
`;

interface IProps {
  open: boolean;
  title: string;
  onClick: () => void;
  expensesElement?: JSX.Element;
  actionElement?: JSX.Element | boolean;
}

const SectionHeader = ({ open, title, onClick, expensesElement, actionElement }: IProps) => {
  return (
    <SectionTitle onClick={onClick}>
      <SectionTitleMain>
        <SectionArrow open={open} />
        <span>{title}</span>
        {actionElement}
      </SectionTitleMain>
      {expensesElement}
    </SectionTitle>
  );
};

export default SectionHeader;
