import { baseUniDriverFactory } from 'wix-ui-test-utils/base-driver';

export const themeProviderDriverFactory = (base, body) => {
  return {
    ...baseUniDriverFactory(base, body),
  };
};
