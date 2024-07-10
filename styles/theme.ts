import { createGlobalStyle, DefaultTheme } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: "Inter", sans-serif;
  }

  body {
    background: ${({ theme }) => theme.bgPrimary};
    min-height: 100vh;
  }

  #__next {
    /* position: relative; */
  }

  h1, h2, h3, p, span {
    color: ${({ theme }) => theme.textPrimary};
  }
`;

export const lightTheme: DefaultTheme = {
  lightBlue: '#2563EB',
  lightRed: '#DC2626',
  darkGreen: '#16A34A',
  textPrimary: '#1E293B',
  textSecondary: '#334155',
  inputLabel: '#64748B',
  inputPlaceholder: '#9CA3AF',
  // bgPrimary: '#ECEEF0'
  bgPrimary: '#ebecf0'
  // bgPrimary: '#e0e0e0'
};
