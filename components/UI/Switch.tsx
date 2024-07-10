import styled from 'styled-components';

const padding = 3;
const width = 40;
const circleSize = 16;

const height = 2 * padding + circleSize;
const translate = width - 2 * padding - circleSize;

const ButtonBody = styled.div<{ enabled: boolean }>`
  width: ${width}px;
  height: ${height}px;
  border-radius: 100px;
  transition: 0.06s ease-out !important;
  background-color: ${({ theme, enabled }) =>
    enabled ? theme.lightBlue : theme.inputPlaceholder};
  padding: ${padding}px;
  cursor: pointer;
`;

const ButtonCircle = styled.div<{ enabled: boolean }>`
  background-color: ${({ theme }) => theme.bgPrimary};
  width: ${circleSize}px;
  height: ${circleSize}px;
  border-radius: 100px;
  transition: inherit;
  transform: ${({ enabled }) =>
    enabled ? `translateX(${translate}px)` : 'none'};
`;

interface IProps {
  enabled: boolean;
  onClick?: () => void;
}

const Switch = ({ enabled, onClick }: IProps) => {
  return (
    <ButtonBody enabled={enabled} onClick={onClick}>
      <ButtonCircle enabled={enabled} />
    </ButtonBody>
  );
};

export default Switch;
