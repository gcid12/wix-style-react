import { baseUniDriverFactory } from 'wix-ui-test-utils/base-driver';
import { dataHooks } from './constants';

export const starsRatingBarDriverFactory = (base, body) => {
  return {
    ...baseUniDriverFactory(base, body),

    /** Select the star rating bar value */
    selectRating: async id => base.$(`[data-index="${id}"]`).click(),

    /** Return the selected rating (a number between 0 to 5) */
    getSelectedRating: async () =>
      base.$$(`[data-hook="${dataHooks.filledStar}"]`).count(),
  };
};
