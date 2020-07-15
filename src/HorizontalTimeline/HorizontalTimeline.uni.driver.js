import { baseUniDriverFactory } from 'wix-ui-test-utils/base-driver';

export const horizontalTimelineDriverFactory = (base, body) => {
  return {
    ...baseUniDriverFactory(base, body),
  };
};
