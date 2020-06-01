import * as React from 'react';

export type Theme = { color?: string };

export interface ThemeProviderProps {
  dataHook?: string;
  theme?: Theme;
}

export default class ThemeProvider extends React.PureComponent<
  ThemeProviderProps
> {}
