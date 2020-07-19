import { baseUniDriverFactory } from '../../test/utils/unidriver';
import { testkit } from '../Input/Input.uni.driver';
import { tickerDriverFactory } from '../Input/Ticker/Ticker.uni.driver';
import { dataHooks } from './constants';

export const timeInputUniDriverFactory = (base, body) => {
  const amPmIndicator = () =>
    base.$(`[data-hook="${dataHooks.amPmIndicator}"]`);
  const input = testkit(base.$(`[data-hook="${dataHooks.input}"]`), body);
  const inputTicker = tickerDriverFactory(base);

  return {
    ...baseUniDriverFactory(base),
    getValue: async () => input.getValue(),
    isDisabled: async () => input.isDisabled(),
    clickTickerUp: async () => inputTicker.clickUp(),
    clickTickerDown: async () => inputTicker.clickDown(),
    isAmPmIndicatorExist: async () => amPmIndicator().exists(),
    toggleAmPmIndicator: async () => amPmIndicator().click(),
    getAmPmIndicatorText: async () => amPmIndicator().text(),
    getCustomSuffix: () =>
      base.$(`[data-hook="${dataHooks.customSuffix}"]`)._prop('innerHTML'),
    isRtl: async () => input.isRTL(),
    setValue: async value => input.enterText(value),
    blur: async () => input.blur(),
  };
};
