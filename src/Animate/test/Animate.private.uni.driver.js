import { animateDriverFactory as publicDriverFactory } from '../Animate.uni.driver';

export const animatePrivateDriverFactory = (base, body) => {
  return {
    ...publicDriverFactory(base, body),

    // Add here driver methods that considered "private"
  };
};
