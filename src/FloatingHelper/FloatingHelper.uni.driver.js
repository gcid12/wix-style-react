import { closablePopoverUniDriverFactory } from './ClosablePopover/ClosablePopover.uni.driver';
import { floatingHelperContentUniDriverFactory } from './FloatingHelperContent/FloatingHelperContent.uni.driver';
import { dataHooks } from './constants';

const floatingHelperUniDriverFactory = (base, body) => {
  const closablePopoverUniDriver = closablePopoverUniDriverFactory(base, body);

  const popoverContent = () => closablePopoverUniDriver.getContentElement();
  const closeButton = () => body.$(`[data-hook="${dataHooks.closeButton}"]`);

  const contentWrapper = async () =>
    (await popoverContent()).querySelector(
      `[data-hook="${dataHooks.contentWrapper}"]`,
    );

  return {
    ...closablePopoverUniDriver,
    /** check whether the helper has a close button */
    hasCloseButton: async () => (await closeButton()).exists(),
    /** click the close button */
    clickCloseButton: async () => (await closeButton()).click(),
    /** Get the driver for the helper's content */
    getHelperContentDriver: () =>
      floatingHelperContentUniDriverFactory(base, body),
    /** Get width of content's root element */
    getWidth: async () => (await contentWrapper()).style.width,
  };
};

export default floatingHelperUniDriverFactory;
