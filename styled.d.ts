import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    lightBlue: string;
    lightRed: string;
    darkGreen: string;
    textPrimary: string;
    textSecondary: string;
    inputLabel: string;
    inputPlaceholder: string;
    bgPrimary: string;
  }
}
