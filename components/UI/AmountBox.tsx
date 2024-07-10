import styled, { DefaultTheme } from 'styled-components';

type ColorType = 'total' | 'used' | 'remaining';

const handleColorType = (type: ColorType, theme: DefaultTheme) => {
  switch (type) {
    case 'total':
      return theme.lightBlue;
    case 'used':
      return theme.lightRed;
    case 'remaining':
      return theme.darkGreen;
  }
};

const AmountBox = styled.span<{
  type: ColorType;
  pointer?: boolean;
  glow?: boolean;
}>`
  font-weight: bold;
  display: block;
  background: ${({ type, theme }) => handleColorType(type, theme)};
  color: white;
  padding: 1px 4px;
  border-radius: 5px;
  cursor: ${({ pointer }) => (pointer ? 'pointer' : 'auto')};
  min-width: fit-content;
  user-select: none;
  box-shadow: ${({ glow, theme }) =>
    glow ? `0 0 5px ${theme.lightRed}` : 'none'};
`;

export default AmountBox;
