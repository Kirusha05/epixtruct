import styled from 'styled-components';

const Button = styled.button<{
  small?: boolean;
  narrow?: boolean;
  widthFull?: boolean;
  grayColor?: boolean;
  narrowOnSmall?: boolean;
  removeMargin?: boolean;
}>`
  /* box-shadow: 3px 3px 6px rgba(0, 0, 0, 0.15), -3px -3px 6px #fdfdfd; */
  box-shadow: 4px 4px 6px rgba(181, 188, 204, 1),
    -3px -3px 10px rgba(255, 255, 255, 1),
    inset 2px 2px 7px rgba(181, 188, 204, 0.1),
    inset -2px -2px 7px rgba(181, 188, 204, 0.1);
  height: ${(props) => (props.small ? '2.2rem' : '2.5rem')};
  border: none;
  border-radius: 0.5rem;
  padding: ${(props) => (props.narrow ? '0 0.4rem' : '0 1.5rem')};
  width: ${(props) => (props.widthFull ? '100%' : 'initial')};
  font-weight: 700;
  color: ${({ theme, grayColor }) => grayColor ? theme.inputLabel : theme.textPrimary};
  cursor: pointer;
  white-space: nowrap;
  transition: 0.15s ease-out;

  display: flex;
  align-items: center;
  gap: 5px;
  margin: ${({ removeMargin}) => removeMargin ? '-10px 0' : '0'};

  font-size: 18px;

  &:active {
    box-shadow: inset 4px 4px 4px rgba(181, 188, 204, 1),
      inset -3px -3px 6px rgba(255, 255, 255, 1),
      2px 2px 7px rgba(181, 188, 204, 0.1),
      -2px -2px 7px rgba(181, 188, 204, 0.1);
  }

  &:hover {
    color: ${({ theme }) => theme.lightBlue};
    background-color: ${({ theme }) => theme.bgPrimary};

    & svg {
      color: ${({ theme }) => theme.lightBlue};
    } 
  }

  @media screen and (max-width: 600px) {
    font-size: 14px;
    padding: ${(props) => (props.narrow || props.narrowOnSmall ? '0 0.4rem' : ' 0 0.6rem')};
    height: 2rem;
  }
`;

export default Button;
