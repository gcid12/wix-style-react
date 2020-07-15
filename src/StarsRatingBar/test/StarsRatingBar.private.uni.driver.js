import { starsRatingBarDriverFactory as publicDriverFactory } from '../StarsRatingBar.uni.driver';
import { dataHooks } from '../constants';

export const starsRatingBarPrivateDriverFactory = (base, body) => {
  return {
    ...publicDriverFactory(base, body),

    /** Get displayed caption label */
    getDisplayedRateCaptionLabel: async () =>
      await base.$(`[data-hook="${dataHooks.ratingCaption}"]`).text(),

    /** Is the rating caption exist */
    isRatingCaptionExists: async () =>
      await base.$(`[data-hook="${dataHooks.ratingCaption}"]`).exists(),

    /** Hover on a star  */
    hoverOnStar: async id => await base.$(`[data-index="${id}"]`).hover(),
  };
};
