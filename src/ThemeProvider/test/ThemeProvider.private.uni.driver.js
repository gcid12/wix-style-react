import { themeProviderDriverFactory as publicDriverFactory } from '../ThemeProvider.uni.driver';

export const themeProviderPrivateDriverFactory = (base, body) => {
  return {
    ...publicDriverFactory(base, body),
  };
};
